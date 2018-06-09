contract_addr = "0xCb1142587108A01f56a99E7299C16f46ef481028"
contract_abi = [{"constant":false,"inputs":[{"name":"move","type":"uint8"}],"name":"makeMove","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"move","type":"uint8"},{"indexed":false,"name":"block","type":"uint256"},{"indexed":false,"name":"player","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"MoveMade","type":"event"}]

const contract = web3.eth.contract(contract_abi)
contract_instance = contract.at(contract_addr);

button_map = {"up"      : 0,
              "down"    : 1,
              "left"    : 2,
              "right"   : 3,
              "a"       : 4,
              "b"       : 5,
              "start"   : 6,
              "select"  : 7 };

function press_callback(error, result)
{
    if(!error)
    {
        console.log(result);
    }
    else
    {
        console.error(error);
    }
}

function press_button(value, button)
{
    if (!button_map.hasOwnProperty(button)) { console.error(button + " is not a known button"); }

    value_wei = 0
    if (value)
    {
        value_int = parseInt(value)

        if (isNaN(value_int) || (value_int > 0 && value_int < 10))
        {
            alert("Enter a valid payment amount or leave the field blank")
            return
        }

        value_wei = web3.toWei(value_int, 'microether')
    }

    button_id = button_map[button]
    call_data = contract_instance.makeMove.getData(button_id);
    web3.eth.sendTransaction({to : contract_addr,
                              from : web3.eth.accounts[0],
                              data : call_data,
                              value : value_wei},
                              press_callback);
}

