const http=require("http");
const fs =require("fs");

const userList=[{name:"Rashid"},
{name:"Ayisha"}]
const server=http.createServer((req,res)=>{

    res.setHeader("Access-Control-Allow-Origin","*");

    switch (req.url) {
        case "/":
            fs.readFile("Home.html","utf-8",(err,homePage)=>{

                if(err)throw(err);
                res.writeHead(200,{ "Content-type":"text/html"});
                res.end(homePage);
            });
            break;


            case "/users":
            res.writeHead(200,{ "Content-type":"text/json"});
            res.end(JSON.stringify(userList))
            break;

            case "/Adduser":
                // console.log("Rashid");
            // res.writeHead(200,{ "Content-type":"text/plain"});
            // res.end("Rashid")

            if (req.method === "POST") {
                let body = "";
                req.on("data", (chunk) => {
                  body += chunk;
                //   console.log(body);
                })

                req.on("end",()=>{
                    const newUser={name:body}
                    userList.push(newUser);
                    // console.log(userList);
                    res.end(JSON.stringify(userList));
                })
                }
            break;

        default:
            res.writeHead(400,{ "Content-type":"plain"});
            res.end("Page not found");
            break;
    }



})
const PORT=3007;
server.listen(PORT,()=>console.log(`Server started at ${PORT}`));