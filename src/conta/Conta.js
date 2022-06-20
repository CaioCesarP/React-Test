import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Conta.css'

const Conta = ({ saldo, realizarTransacao }) => {
    const defaultValores = {transacao: '', valor: 0};
    const [valores, atualizarValores] = useState({transacao: '', valor: 0});
    const button = document.querySelector(".Button-operacao .Button");

    function handleChange(e) {
        const { name, value } = e.target;
        const valoresAtualizados = { ...valores, [name]: value};

        atualizarValores(valoresAtualizados);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dataTransacao = new Date().toLocaleDateString('pt-br');
        valores.transacao !== "" &&
            valores.valor !== 0 &&
                realizarTransacao({...valores, data: dataTransacao});
        atualizarValores(defaultValores);
    }

    const showButton = () => {
        valores.transacao !== "" &&
            valores.valor !== 0 &&
                button.style.setProperty("visibility", "visible");;
    };

    return <div className="Conta-header">
        <h2>Conta</h2>
        <p>Saldo: <span data-testid="saldo-conta" className="Saldo-valor">{`R$ ${saldo}`}</span></p>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Depósito
                    <input
                        type="radio"
                        name="transacao"
                        value="deposito"
                        onChange={handleChange}
                        data-testid="transacao"
                        checked={valores.transacao === 'deposito'}   
                    />
                </label>
            </div>
            
            <div>
                <label>
                    Saque
                    <input
                        type="radio"
                        name="transacao"
                        value="saque"
                        data-testid="transacao"
                        onChange={handleChange}
                        checked={valores.transacao === 'saque'}     
                    />
                </label>
            </div>

            <label>Valor:</label>
            <input
                type="text"
                name="valor"
                value={valores.valor}
                data-testid="valor"
                onChange={handleChange}
            ></input>

            <div className="Button-operacao">
                <button className="Button" type='submit'>
                    {showButton()}
                    Realizar operação
                </button>
            </div>
        </form>
    </div>
};

Conta.defaultProps = {
    saldo: 0,
}

Conta.propTypes = {
    saldo: PropTypes.number,
};

export default Conta;
