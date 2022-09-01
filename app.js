if(localStorage.getItem('Produtos') !== null){ 
    MostrarProdutos()
    Soma()
}
function save(){
    var Produtos = [];
    let produto = document.getElementById('produto').value;
    let valor = document.getElementById('valor').value;
    let quantidade = document.getElementById('quantidade').value;
    
    var ValorTotal = quantidade * valor
    let _id = Math.floor(Math.random() * 65536)

    if(localStorage.getItem('Produtos') == null){ 
        console.log('Primeiro Produto Cadastrado com Sucesso')
        
        var itens = [{id_:_id,Produto: produto,Valor: valor,Quantidade: quantidade,ValorT:ValorTotal}];
        Array.prototype.push.apply(Produtos, itens)
        ProdutosJson = JSON.stringify(Produtos);
        localStorage.setItem('Produtos',ProdutosJson)
    }else{
        var ProdutosJson =  localStorage.getItem('Produtos')
        var Produtos = JSON.parse(ProdutosJson);
        var itens = [{id_:_id,Produto: produto,Valor: valor,Quantidade: quantidade,ValorT:ValorTotal}];

        Array.prototype.push.apply(Produtos, itens)

        ProdutosJson = JSON.stringify(Produtos);
        localStorage.setItem('Produtos',ProdutosJson)
        console.log('Produto Cadastrado com Sucesso')
    }
    CriarLinha(_id,produto,valor,quantidade,ValorTotal)
    document.getElementById('produto').value =  ''
    document.getElementById('valor').value= ''
    document.getElementById('quantidade').value = ''
}
function Soma(){
    var money = document.getElementById("money")
    let tdsValores = document.querySelectorAll('.valor')
    let total = 0 
    for (let i = 0; i < tdsValores.length; i++) {
        let valor = parseFloat(tdsValores[i].textContent)
        total = total + valor 
    }
    money.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) 
}
function show(){
    if(localStorage.getItem('Produtos') !== null){ 
        var ProdutosJson =  localStorage.getItem('Produtos')
        var data = JSON.parse(ProdutosJson);
        console.table(data)
    }else{
        console.log('Não há Produto Cadastrado!!!')
    }
}
function Excluir(id,idProduto){
        document.getElementById(id).remove();
        if(localStorage.getItem('Produtos') !== null){ 
            var ProdutosJson =  localStorage.getItem('Produtos')
            var data = JSON.parse(ProdutosJson);
            removerPorId(data,idProduto);
            function removerPorId(array, id) {
                var result = array.filter(function(el) {
                return el.id_ == id;
                });
                for(var elemento of result){
                var index = array.indexOf(elemento);    
                array.splice(index, 1);
                }
            }
            localStorage.setItem('Produtos',JSON.stringify(data))
        }
        Soma()
}
function limpar(){
    var resposta = confirm("Deseja Excluir Tudo?");
    if (resposta == true) {
        if(localStorage.getItem('Produtos') !== null){ 
            console.log('Limpar')
            localStorage.clear('Produtos') 
        }
        location.reload()
    }
}
function CriarLinha(_id,Produto,Valor,Quantidade,ValorTotal){
    var id = Math.floor(Math.random() * 65536);
    let Flexbox = document.getElementById('table');
    let Flex = document.createElement('tr');
    let p1 = document.createElement('td');
    let p2 = document.createElement('td');
    let p3 = document.createElement('td');
    let p4 = document.createElement('td');
    let p5 = document.createElement('td');
    let p6 = document.createElement('td');
    let btn = document.createElement('button');
    Flex.setAttribute('id',id); 
    p1.innerHTML = Produto
    p2.innerHTML = Quantidade
    p3.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Valor)
    btn.setAttribute('onclick','Excluir("'+id+'","'+ _id +'")'); 
    btn.innerHTML = 'X'
    p4.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ValorTotal)
    p6.innerHTML = ValorTotal
    p6.setAttribute('class','valor'); 
    p6.setAttribute('style','display:none'); 
    Flex.appendChild(p1);
    Flex.appendChild(p2);
    Flex.appendChild(p3);
    Flex.appendChild(p4);
    Flex.appendChild(p5);
    Flex.appendChild(p6);
    p5.appendChild(btn);
    Flexbox.appendChild(Flex);
    Soma()
}
function MostrarProdutos(){
var ProdutosJson =  localStorage.getItem('Produtos')
var Produtos = JSON.parse(ProdutosJson);
    Produtos.forEach((item) => {
        var id = Math.floor(Math.random() * 65536);
        let Flexbox = document.getElementById('table');
        let Flex = document.createElement('tr');
        let p1 = document.createElement('td');
        let p2 = document.createElement('td');
        let p3 = document.createElement('td');
        let p4 = document.createElement('td');
        let p5 = document.createElement('td');
        let p6 = document.createElement('td');
        let btn = document.createElement('button');
        Flex.setAttribute('id',id); 
        p1.innerHTML = item.Produto
        p2.innerHTML = item.Quantidade
        p3.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.Valor)
        btn.setAttribute('onclick','Excluir("'+id+'","'+item.id_+ '")'); 
        btn.innerHTML = 'X'
        p4.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.ValorT)
        p6.innerHTML = item.ValorT
        p6.setAttribute('class','valor'); 
        p6.setAttribute('style','display:none'); 
        Flex.appendChild(p1);
        Flex.appendChild(p2);
        Flex.appendChild(p3);
        Flex.appendChild(p4);
        Flex.appendChild(p5);
        Flex.appendChild(p6);
        p5.appendChild(btn);
        Flexbox.appendChild(Flex);
    });

}
function ExportarJson(){
    var res = confirm("Deseja Salvar?")
    if(res === true){
        let nomeArquivo = prompt("Digite o Nome do Arquivo")
        var ProdutosJson =  localStorage.getItem('Produtos')
        let blob = new Blob( [ProdutosJson] , {type: "text/plain;charset=utf-8"} );
        saveAs(blob,nomeArquivo+".json");
    }
}
let btn_import = document.getElementById('importar');
let file = document.getElementById('file');
btn_import.addEventListener('click', () => {file.click();});
file.addEventListener('change', () => {
    if (file.files.length <= 0) {return;}
    let reader = new FileReader();
    reader.onload = () => {lendoJson(reader.result);}
    reader.readAsDataURL(file.files[0]);
});
function lendoJson(jsn) {
    let request = new XMLHttpRequest()
    request.open("GET", jsn, false)
    request.send()
    request.responseText
    let data = request.responseText
    localStorage.setItem('Produtos',data)
    location.reload()
}