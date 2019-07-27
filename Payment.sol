pragma solidity^0.5.1;

contract Payment{
    
    function fpay(address payable beneficiary) payable public {
        beneficiary.transfer(msg.value);
    }
    
    function getEthBalance(address _addr) public returns(uint) {
        return _addr.balance;
    }
    
}