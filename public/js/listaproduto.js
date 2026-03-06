import { Requests } from "./Requests.js";
const tabela = new $('#tabela').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
    stateSave: true,
    select: true,
    processing: true,
    serverSide: true,
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
        searchPlaceholder: 'Digite sua pesquisa...'
    },
    ajax: {
        url: '/produto/listproduto',
        type: 'POST'
    },
    columnDefs: [
        {
            targets: [4],
            render: function (data, type, row) {
                if (type === 'display') {
                    return parseFloat(data).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                }
                return data;
            }
        }
    ]
});

// --- LÓGICA DE ATALHOS ---
document.addEventListener('keydown', function (e) {
    
    // F2 - Ir para Cadastro
    if (e.key === 'F2') {
        e.preventDefault();
        window.location.href = '/produto/cadastro';
    }
});

async function AjustarEstoque(id) {
    console.log(`AjustarEstoque - ID: ${id}`);
    document.getElementById('id').value = id;

    //Fas uma requisição para obter os dados do produto
    const response = await Requests.SetForm('form').Get('/produto/selecionarestoque');
    if (!response.status) {
        //Exibe um alerta de produto não encontrado
        Swal.fire({
            title: "Produto nao encontrado!",
            icon: "error",
            html: response.msg,
            timer: 3000,
            timerProgressBar: true
        });
        return;
    }
}
window.AjustarEstoque = AjustarEstoque;

window.Delete = Delete;