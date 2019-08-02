pragma solidity ^0.4.0;

contract User{
    
    struct Details{
    
        string privateKey;
        string password;
        string phoneNumber;
        string vehicle;
        string vehicleNo;
        string name;
        string category;
    
    }
    mapping ( string  => Details)  detailsMap;
    
    function get(string username) view returns(string,string,string,string,string,string){
    
        Details memory currentUser=detailsMap[username];
        return (
           
            currentUser.privateKey,
            currentUser.phoneNumber,
            currentUser.vehicle,
            currentUser.vehicleNo,
            currentUser.category,
            currentUser.name
            
        );
    
    }
    function set(string name,string username,string phoneNumber,string vehicle,string vehicleNo,string category,string password,string key) public{
        detailsMap[username]=Details(
            key,
            password,
            phoneNumber,
            vehicle,
            vehicleNo,
            name,
            category
        );
        
    }
    
}