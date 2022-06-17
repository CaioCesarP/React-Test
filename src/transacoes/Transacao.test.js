import React from "react";
import { render } from "@testing-library/react";

import Transacao from "./Transacao";

describe("Componente de transação do extrato:", () => {
  it("O snapshot do componente deve permanecer sempre o mesmo.", () => {
    const { container } = render(
      <Transacao data="08/09/2020" tipo="saque" valor="20.00" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("O snapshot do componente deve receber os dados das transações.", () => {
    const transacoes = [
      {
        id: 1,
        data: "20/02/2022",
        valor: 20.0,
        transacao: "saque",
      },
      {
        id: 2,
        data: "10/05/2022",
        transacao: "deposito",
        valor: 50.0,
      },
      {
        id: 3,
        data: "20/16/2021",
        transacao: "deposito",
        valor: 90.0,
      },
      {
        id: 4,
        data: "30/01/2020",
        transacao: "saque",
        valor: 50.0,
      },
    ];

    const { container } = render(<Transacao transacoes={transacoes} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
