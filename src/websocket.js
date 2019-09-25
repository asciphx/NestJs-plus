// @ts-nocheck
const s=require("socket.io"),_ = require('underscore');
Array.prototype.remove =function(f){var r = this.slice(f+1||this.length);r.forEach(function(i){
Object.defineProperty(i,'id',{value:i.id-1})});this.length=f<0?this.length+f:f;return this.push.apply(this, r)};
let users=new Array();
// client.emit() ：向建立该连接的客户端广播console.log(users)查看客户端的人数
// client.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
// 通过该连接对象（toSocket）与链接到这个对象的客户端进行单独通信function Ip (pp) {this.id=pp.id;this.ip=pp.ip;}
exports.init =(args)=>{
    let io=s(args);
    let userNum=0,ip;
    io.on("connection",(client)=>{
        ip=userNum;ip={id:ip,ip:client.id,t:0};users.push(ip);userNum++;
        if (io.sockets.connected[ip.ip]) {
            _.findWhere(io.sockets.sockets, {id:ip.ip}).emit('message',{id:ip.id,ip:ip.ip,data:"pong"});
        }
        client.on("disconnect",()=>{
            ip=client.id;userNum--;
            for(let l=0,A;A=users[l++];){if(A.ip===ip){
                io.emit("message",{data:'send',admin:A.admin,id1:'rmove',time:new Date().toLocaleTimeString()});
                users.remove(A.id);break;
            }}
        });
        client.on("message",(mes)=>{
            if(mes.data==="ping"&&users[mes.id]){
                if(users[mes.id]["t"]===0){
                    mes.data="add";users[mes.id]["t"]=1;
                    users[mes.id]["admin"]=mes.admin;
                    mes["time"]=new Date().toLocaleTimeString();
                    io.emit("message",mes);
                }
            }else if(mes.data==='del'){
                _.findWhere(io.sockets.sockets, {id:mes.ip}).disconnect(true);
            }else{
                mes["time"]=new Date().toLocaleTimeString();
                io.emit("message",mes);
            }
        });
    });
}
exports.del=(args)=>{
    users.remove(args);
}
exports.users=users;