import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Conta from "../conta/Conta";

describe("Componente de conta:", () => {
  it("Exibir saldo da conta com valor monetário", () => {
    render(<Conta saldo={2000} />);

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 2000");
  });

  it("Chama a função de realizar a tansição, quando o botão é clicado...", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    const checkBox = screen.getByDisplayValue("deposito");
    const input = screen.getByTestId("valor");
    const button = screen.getByText("Realizar operação");

    fireEvent.click(checkBox);
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(button);
    
    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });

  it("Não chama a função de realizar transição, quando valores default...", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={3000} realizarTransacao={funcaoRealizarTransacao} />);

    const checkBox = screen.getAllByTestId("transacao");
    const input = screen.getByTestId("valor");
    const button = screen.getByText("Realizar operação");

    expect(checkBox.checked).toEqual(undefined);
    expect(input).toHaveValue("0");

    fireEvent.click(button);
    expect(funcaoRealizarTransacao).not.toHaveBeenCalled();
  });
});
