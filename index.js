const htmlparser = require("htmlparser2");
const DomHandler = require("domhandler");
const fs = require("fs");
const express = require('express')
const app = express()

var result = "";
app.use(express.static('public'));
app.get('/json/:filename',ShowDOM);
app.get('/files/index',ShowFolder)

app.listen(3000, () => console.log('Example app listening on port 3000!'))

function ShowDOM(req,res)
{
    var filename = req.params.filename;
    console.log(filename)
    if (!filename) filename="index.html"
    const file = fs.readFileSync("Web/"+filename,{encoding:"utf-8"});
    //console.log(file);
    var handler = new DomHandler(ASPHandler);
    var parser = new htmlparser.Parser(handler);
    parser.write(file);
    parser.end();
    //console.log(result)
    res.send(result);

}

function ASPHandler(error,dom)
{
    if (error) { console.log(error); return;}

    result = JSON.stringify(Tree(dom,0));
}

function Tree(o,lvl)
{
    var out = null;
    const type = typeof(o);
    switch(type)
    {
        case "string": return o;
        case "number": return o;
        case "function": return "function()";
        case "object":
            if (o===null) return null;
            //console.log(o._prototype)
            if (o.length!==undefined)
            {
                out = [];
                o.forEach(e => out.push(Tree(e,lvl+1)));
                return out;
            }
            else
            {
                out = {};
                for (let key in o)
                {
                    if(o.hasOwnProperty(key))
                    {
                        if (["next","prev","parent","attribs"]
                                .includes(key)) 
                        {
                            ////if (!key=="attribs")
                                continue;
                        }
                                
                        if (lvl>40) return ["..."];
                        out[key] = (Tree(o[key],lvl+1));
                    } 
                }
                return out;
            }
            break;
        default: return type;
    }
    return out;
}

function ShowFolder(req,res)
{
    var folder = fs.readdirSync("Web",{encoding:"utf-8"});
    var files;
    files=folder.map(function(f){
        return {filename:f};
    }).filter(filetype);
    var result = JSON.stringify(files);
    res.send(result);

    function filetype(fn)
    {
        return ( fn.filename.indexOf(".htm") >= 0
                || fn.filename.indexOf(".asp") >= 0
               );
    }
}
