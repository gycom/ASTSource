function RenderTemplate(template,mapping)
{
    var t = template;
    for (var key in mapping)
    {
        t = t.replace(new RegExp(key,"gi"),mapping[key]);
    }
    return t;
}

function getAllTemplates()
{
    var all = {};
    var tag = document.querySelectorAll(".Template");
    //console.log(tag)
    tag.forEach(t=>all[t.id]=document.getElementById(t.id).innerHTML);
    return all;
}