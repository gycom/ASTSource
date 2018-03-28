var dir = [];
var TEMPLATE;
function Init()
{
    TEMPLATE = getAllTemplates();
    ReadFolder();
}
const ReadFolder = () => getData("files/index",RenderFiles);
const ShowDetail = filename => getData("json/" + filename,RenderDOM);
const getData = (url,callback) => fetch(url)
                                    .then(res=>res.json())
                                    .then(data=>callback(data));

function RenderFiles(files)
{
    dir = files;
    var div = document.getElementById("files");
    div.innerHTML = "<ul>" + dir.map(RenderFile).join("") + "</ul>";
    function RenderFile(f)
    {
        var mapping = {
            "{FILENAME}": f.filename
        };
        return RenderTemplate(TEMPLATE.fileTemplate,mapping);
    }
}

function RenderDOM(dom)
{
    xyz(dom);
/*    var div = document.getElementById("explore");
    div.innerHTML = JSONTree.create(dom,{ indent: 8 });*/
}
