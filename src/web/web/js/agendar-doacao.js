document.getElementById('deliveryOption').addEventListener('change', function() {
    const addressFields = document.getElementById('addressFields');
    if (this.value === 'coleta') {
        addressFields.style.display = 'block';
    } else {
        addressFields.style.display = 'none';
    }
});

document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const dateTime = document.getElementById('dateTime').value;
    const deliveryOption = document.getElementById('deliveryOption').value;
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const complemento = document.getElementById('complemento').value;
    const cep = document.getElementById('cep').value;
    const numero = document.getElementById('numero').value;

    if (name === '' || cpf === '' || dateTime === '' || deliveryOption === '') {
        alert('Todos os campos obrigatórios devem ser preenchidos.');
        return;
    }

    if (deliveryOption === 'pickup' && (uf === '' || cidade === '' || rua === '' || cep === '')) {
        alert('Todos os campos de endereço são obrigatórios para a opção de coleta.');
        return;
    }

    let message = `Obrigado, ${name}! Sua doação foi agendada para ${dateTime}.`;

    if (deliveryOption === 'pickup') {
        message += ` A ONG irá coletar a doação no endereço: ${rua}, ${numero}, ${bairro}, ${cidade} - ${uf}, ${cep}.`;
    } else {
        message += ' Você entregará a doação diretamente na ONG.';
    }

    alert(message);
    // Aqui você pode adicionar o código para enviar os dados para o servidor, se necessário.
});
