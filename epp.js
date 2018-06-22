const contract = web3.eth.contract(contract_abi);
contract_instance = contract.at(contract_addr);

button_map = {
    "up"      : 0,
    "down"    : 1,
    "left"    : 2,
    "right"   : 3,
    "a"       : 4,
    "b"       : 5,
    "start"   : 6,
    "select"  : 7
};

var deposit_max = 0;

var channel_sig;
var channel_nonce = 0;
var channel_value = 0;
var channel_hash;
var channel_button;
var channel_is_locked = true;

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function copyToClipboard()
{
    let box = document.getElementById('signed_message');
    box.select();
    document.execCommand("copy");
}

// Some magic to convert a signature to r,s,v form
function rsv(sig) {
    let r = `0x${sig.slice(0, 64)}`;
    let s = `0x${sig.slice(64, 128)}`;
    // MetaMask doesn't need to add 27 here, but some clients might
    let v = web3.toDecimal(`0x${sig.slice(128, 130)}`);
    if (v == 0 || v == 1) {
        v += 27;
    }

    return { r: r, s: s, v: v };
}

function log_callback(error, result)
{
    if (!error) {
        console.log(result);
    } else {
        console.error(error);
    }
}

function press_button(value, button)
{
    console.log("value:", value, "nonce:", channel_nonce, "button:", button);
    document.getElementById('signed_message').style.borderColor = "black";

    if (!button_map.hasOwnProperty(button)) {
        console.error(button + " is not a known button");
        return
    }

    let value_int = parseInt(value);
    if (isNaN(value_int) || value_int <= 0) {
        alert("Enter a valid payment amount");
        return
    }
    if (value_int > deposit_max || deposit_max == 0) {
        alert("Insufficient funds in channel");
        return
    }
    let value_wei = web3.toWei(value_int, 'microether');

    if (!channel_nonce) {
        alert("Invalid channel ID");
        return
    }

    if (Number(value_wei) <= Number(channel_value)) {
        alert("Trying to make a payment for less than the previous one! If you're sure you want to do this, clear cookies and re-try.");
        return
    }

    if (channel_is_locked) {
        alert("Channel is closed. Withdraw funds and open a new channel to play!");
        return
    }

    button_id = button_map[button];
    channel_button = button_id;

    let msg_params = [
        {
            type: 'address',
            name: 'contract',
            value: contract_addr
        },
        {
            type: 'uint',
            name: 'nonce',
            value: channel_nonce,
        },
        {
            type: 'uint',
            name: 'value',
            value: value_wei,
        },
        {
            type: 'uint',
            name: 'button',
            value: button_id,
        },
    ];
    web3.currentProvider.sendAsync({
            method: 'eth_signTypedData',
            params: [msg_params, web3.eth.accounts[0]],
            from: web3.eth.accounts[0],
        }, function (error, result) {
            if (!error) {
                // TODO on cancel why is this called?
                let signed = result.result;
                console.log("Signed hashAuthorization:", signed, signed.length);
                let sig = rsv(signed.slice(2));
                console.log("r:", sig.r, "s:", sig.s, "v:", sig.v);
                channel_sig = sig;

                let json_signed = {
                    "addr": web3.eth.accounts[0],
                    "nonce": channel_nonce,
                    "value": value_wei,
                    "button": button_id,
                    "sig": signed
                }
                // Update signed message box
                document.getElementById('signed_message').textContent = JSON.stringify(json_signed);
                check_sig(value_wei);
            } else {
                console.error(error);
            }
        }
    );
}

function check_sig(value)
{
    if (!channel_sig) {
        alert("Sign a message first by pushing a button");
        return
    }

    console.log("Channel nonce:", channel_nonce, typeof(channel_nonce));
    console.log("Channel value:", value, typeof(value));
    console.log("Channel button:", channel_button, typeof(channel_button));
    console.log("Sig: ", channel_sig);

    contract_instance.checkSignature.call(web3.eth.accounts[0], channel_nonce, value, channel_button, channel_sig.r, channel_sig.s, channel_sig.v, function(error, result) {
        if (!error) {
            console.log("Check:", result, typeof(result));
            document.getElementById('signed_message').style.borderColor = "green";

            // If sig check passes, update cookie
            setCookie("value", value, 10000);
            // Also update the close channel payment field
            document.getElementById('close_payment').value = Number(web3.fromWei(value, 'microether'));
            // Update the payment automagically
            document.getElementById('move_payment').value = Number(web3.fromWei(value, 'microether')) + 1;
            channel_value = value;
        } else {
            console.error(error);
            document.getElementById('signed_message').style.borderColor = "red";
        }
    });
}

// Craft a transaction to open a new channel or deposit ETH into existing channel
function deposit(value)
{
    console.log("Depositing ether.");

    let value_int = parseInt(value);
    if (isNaN(value_int) || value_int <= 0 || (value_int > 0 && value_int < 10)) {
        alert("Enter a valid payment amount");
        return
    }
    let value_wei = web3.toWei(value_int, 'microether');

    if (channel_is_locked) {
        alert("Channel is closed. Withdraw funds and open a new channel to play!");
        return
    }

    let call_data = contract_instance.deposit.getData();

    web3.eth.sendTransaction(
        {
            to : contract_addr,
            from : web3.eth.accounts[0],
            data : call_data,
            value : value_wei
        },
        log_callback
    );
}

// Craft a transaction to request channel closure
function close_channel(value)
{
    console.log("Requesting channel close.");

    let value_int = parseInt(value);
    if (isNaN(value_int) || value_int < 0 || value_int > deposit_max) {
        alert("Enter a valid channel close amount");
        return
    }
    let value_wei = web3.toWei(value_int, 'microether');

    if (channel_is_locked) {
        alert("Channel is closed. Withdraw funds and open a new channel to play!");
        return
    }

    let call_data = contract_instance.initiateWithdrawal.getData(value_wei);

    web3.eth.sendTransaction(
        {
            to : contract_addr,
            from : web3.eth.accounts[0],
            data : call_data,
            gas : 200000
        },
        log_callback
    );
}

// Withdraw any unlocked funds
function withdrawFunds()
{
    console.log("Withdrawing funds.");

    let call_data = contract_instance.withdraw.getData();

    web3.eth.sendTransaction(
        {
            to : contract_addr,
            from : web3.eth.accounts[0],
            data : call_data,
            gas : 100000
        },
        function(error, result) {
            if (!error) {
                // Reset the channel value
                let value = 0;
                // If sig check passes, update cookie
                setCookie("value", value, 10000);
                // Also update the close channel payment field
                document.getElementById('close_payment').value = Number(web3.fromWei(value, 'microether'));
                // Update the payment automagically
                document.getElementById('move_payment').value = Number(web3.fromWei(value, 'microether')) + 1;
                channel_value = value;
            } else {
                console.error(error);
            }
        }
    );
}

// Change between basic and advanced layout
function setDisplayMode(is_advanced)
{
    console.log("Setting display mode to advanced:", is_advanced);

    if (is_advanced) {
        document.getElementById('layout_basic').style.display = "none";
        document.getElementById('layout_advanced').style.display = "initial";
    } else {
        document.getElementById('layout_basic').style.display = "initial";
        document.getElementById('layout_advanced').style.display = "none";
    }
}

// Clear cookie
function clearCookie()
{
    let ret = confirm("Are you sure you want to delete saved channel data?");
    if (ret) {
        setCookie("value", 0, -1);
        location.reload();
    }
}

// When page is first loaded, initialize some values
window.addEventListener('load', function() {
    channel_value = getCookie('value');

    let value = 0;
    if (channel_value) {
        value = Number(web3.fromWei(channel_value, 'microether'));
    }

    document.getElementById('move_payment').value = value + 1;
    document.getElementById('close_payment').value = value;
});

// Each second, update values as needed
setInterval(function() {
    checkDepositBalance();
    checkNonce();
    checkLockedBalance();
    checkIsLocked();
}, 1000);

// Check deposit balance
function checkDepositBalance()
{
    contract_instance.balanceOf.call(web3.eth.accounts[0], function(error, result) {
        if (!error) {
            deposit_max = Number(web3.fromWei(result, 'microether'));
            document.getElementById('channel_capacity').textContent = deposit_max;
            document.getElementById('remaining_moves').textContent = deposit_max - web3.fromWei(channel_value, 'microether');
        } else {
            console.error(error);
        }
    });
}

// Check the nonce
function checkNonce()
{
    contract_instance.nonceOf.call(web3.eth.accounts[0], function(error, result) {
        if (!error) {
            let nonce = web3.toDecimal(result);
            document.getElementById('nonce').textContent = nonce;
            channel_nonce = nonce;
        } else {
            console.error(error);
        }
    });
}

// Check the locked (withdrawable) balance
function checkLockedBalance()
{
    // Don't look at this
    web3.eth.getBlockNumber(function(error, result) {
        if (!error) {
            var block_height = web3.toDecimal(result);
            contract_instance.lockedAt.call(web3.eth.accounts[0], function(error, result) {
                if (!error) {
                    var locked_at = web3.toDecimal(result);
                    contract_instance.lockupPeriod.call(function(error, result) {
                        if (!error) {
                            var lockup_period = web3.toDecimal(result);
                            contract_instance.lockedBalanceOf.call(web3.eth.accounts[0], function(error, result) {
                                if (!error) {
                                    let locked_balance = web3.fromWei(result, 'microether');
                                    if (block_height - locked_at > lockup_period) {
                                        document.getElementById('locked_balance').textContent = locked_balance;
                                        document.getElementById('locked_balance_extra').textContent = "";
                                    } else {
                                        document.getElementById('locked_balance').textContent = 0;
                                        let extra = "(" + locked_balance + " will be available in " + (lockup_period - (block_height - locked_at)) + " blocks)";
                                        document.getElementById('locked_balance_extra').textContent = extra;
                                    }
                                } else {
                                    console.error(error);
                                }
                            });
                        } else {
                            console.error(error);
                        }
                    });
                } else {
                    console.error(error);
                }
            });
        } else {
            console.error(error);
        }
    });
}

// Check if channel is locked
function checkIsLocked()
{
    contract_instance.isLocked.call(web3.eth.accounts[0], function(error, result) {
        if (!error) {
            channel_is_locked = result;
        } else {
            console.error(error);
        }
    });
}

