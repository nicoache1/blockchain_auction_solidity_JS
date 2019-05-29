pragma solidity ^0.5.1;

contract Cooperative {

    address payable private owner;
    address payable private addres1 = 0x8E35D51973d42665c94Ebb2Ec4b31560e4f0981f;
    address payable private addres2 = 0x934392946Ef1a29E1523607E27dfde7e71175Ce2;
    
    constructor() payable public {
        owner = msg.sender;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    //Enviar dinero al contrato
    function () external payable {}
    
    //Repartir los fondos
    function split() public payable onlyOwner() {
        uint256 balance = address(this).balance/2;
        addres1.transfer(balance);
        addres2.transfer(balance);
    }
    
    //Obtener el dinero del contrato
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
}