import React from "react";
import { render, screen } from "@testing-library/react";

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
    it("Que é saque, valor vai diminuir", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };

      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(100);
    });
  });
});
