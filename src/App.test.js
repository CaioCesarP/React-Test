import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import App, { calcularNovoSaldo } from "./App";

describe("Component principal: ", () => {
  describe("Quando abro o app do banco...", () => {
    it("O nome do banco é exibido.", () => {
      render(<App />);

      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    it("O saldo é exibido.", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    it("O botão de realizar transação é exibido.", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  describe("Quando realizo transações...", () => {
    describe("Que é saque...", () => {
      it("Valor vai diminuir.", () => {
        const valores = {
          transacao: "saque",
          valor: 50,
        };

        const novoSaldo = calcularNovoSaldo(valores, 150);

        expect(novoSaldo).toBe(100);
      });

      it("A transação deve ser realizada.", () => {
        const { getByText, getByTestId, getByLabelText } = render(<App />);

        const saldo = getByText("R$ 1000");
        const transacao = getByLabelText("Saque");
        const valor = getByTestId("valor");
        const botaoTransacao = getByText("Realizar operação");

        //garantir que o saldo corresponde ao default(R$ 1000)
        expect(saldo.textContent).toBe("R$ 1000");
        //garantir que ao clicar no botão o valor corresponde a Saque
        fireEvent.click(transacao, { target: { value: "Saque" } });
        fireEvent.change(valor, { target: { value: 100 } });
        fireEvent.click(botaoTransacao);

        expect(saldo.textContent).toBe("R$ 900");
      });
    });
  });
});
