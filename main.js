function logar() {
  var login = document.getElementById('userLogin').value;
  var senha = document.getElementById('userPass').value;

  if(login == 'admin' && senha == 'admin') {
    alert('Sucesso');
    location.href = './index.html';
  } else {
    alert('Usuário ou Senha incorretos');
  }
}

class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  getDados() {
    let produto = {}

    produto.id               = this.id;
    produto.nomeProduto      = document.getElementById('prodName').value;
    produto.descricaoProduto = document.getElementById('prodDesc').value;
    produto.precoProduto     = document.getElementById('prodPrice').value;
    return produto;
  }

  validaCampos(produto) {
    let message = '';

    if(produto.nomeProduto == ''){
      message += '- Informe o Nome do Produto \n';
    }

    if(produto.descricaoProduto == ''){
      message += '- Informe a Descrição do Produto \n';
    }

    if(produto.precoProduto == ''){
      message += '- Informe o Preço do Produto \n';
    }

    if(message != '') {
      alert(message);
      return false;
    }

    return true;
  }

  salvar() {
    let produto = this.getDados();

    if(this.validaCampos(produto)) {
      if(this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
    };

    console.log(this.arrayProdutos);
    this.listarProdutos();
    this.cancelar();
  }

  adicionar(produto) {
    produto.precoProduto = parseFloat(produto.precoProduto);
    this.arrayProdutos.push(produto);
    this.id++;
  }

  cancelar() {
    document.getElementById('prodName').value = '';
    document.getElementById('prodDesc').value = '';
    document.getElementById('prodPrice').value = '';

    document.getElementById('btn1').innerText = 'Salvar';
    this.editId = null;
  }

  listarProdutos() {
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';

    for(let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_id        = tr.insertCell();
      let td_nome      = tr.insertCell();
      let td_descricao = tr.insertCell();
      let td_valor     = tr.insertCell();
      let td_acoes     = tr.insertCell();

      td_id.innerText        = this.arrayProdutos[i].id;
      td_nome.innerText      = this.arrayProdutos[i].nomeProduto;
      td_descricao.innerText = this.arrayProdutos[i].descricaoProduto;
      td_valor.innerText     = this.arrayProdutos[i].precoProduto;

      td_acoes.classList.add('center');

      let imgEdit = document.createElement('img');
      imgEdit.src = './assets/edit.svg';
      imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

      let imgDelete = document.createElement('img');
      imgDelete.src = './assets/deleteV2.svg';
      imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);
    }
  }

  preparaEdicao(dados) {
    this.editId = dados.id;

    document.getElementById('prodName').value = dados.nomeProduto;
    document.getElementById('prodDesc').value = dados.descricaoProduto;
    document.getElementById('prodPrice').value = dados.precoProduto;

    document.getElementById('btn1').innerText = 'Atualizar';
  }

  atualizar(id, produto) {
    for(let i = 0; i < this.arrayProdutos.length; i++) {
      if(this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nomeProduto      = produto.nomeProduto;
        this.arrayProdutos[i].descricaoProduto = produto.descricaoProduto;
        this.arrayProdutos[i].precoProduto     = produto.precoProduto;
      }
    }
  }

  deletar(id) {

    if(confirm('Deletar o ID >> ' + id + ' << ?!')) {
      let tbody = document.getElementById('tbody');
  
      for(let i = 0; i < this.arrayProdutos.length; i++) {
        if(this.arrayProdutos[i].id == id) {
          alert('Deletar o ID >> ' + id + ' << ?!');
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
      console.log(this.arrayProdutos);
    }
  }
}

var produto = new Produto();