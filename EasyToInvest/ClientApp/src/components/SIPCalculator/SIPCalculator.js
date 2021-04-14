import React, { useEffect, useState, useMemo } from "react";
import { Col, Form, FormGroup, Label, Input, Row } from "reactstrap";
import Currency from "react-currency-formatter";
import BarChart from "../common/BarChart/BarChart";
import formatter from "../utils/CurrencyFormatory";
import styles from "./SIPCalculator.module.css";

export default function SIPCalculator() {
  const [amount, setAmount] = useState(1000);
  const [period, setPeriod] = useState(10);
  const [returns, setReturns] = useState(14);
  const [result, setResult] = useState({
    totalInvested: 0,
    totalReturns: 0,
    extraReturns: 0,
  });

  const currencyFormattor = formatter("en-IN", "INR").format;

  const ChangeHandler = (e) => {
    const value = parseFloat(e.target.value);
    switch (e.target.name) {
      case "amount":
        setAmount(value);
        break;
      case "period":
        setPeriod(value);
        break;
      case "expected-returns":
        setReturns(value);
        break;
    }
  };

  useEffect(() => {
    const i = returns / 1200;
    const months = period * 12;
    const totalReturns = amount * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    const fdInterest = 6.5 / 1200;
    const totalFDReturns =
      amount *
      ((Math.pow(1 + fdInterest, months) - 1) / fdInterest) *
      (1 + fdInterest);
    const totalInvested = amount * period * 12;
    setResult({
      totalInvested: +totalInvested.toFixed(2),
      totalReturns: +totalReturns.toFixed(2),
      extraReturns: +(totalReturns - totalInvested).toFixed(2),
      totalFDReturns: +totalFDReturns.toFixed(2),
      fdInterest: +(totalFDReturns - totalInvested).toFixed(2),
    });
  }, [amount, period, returns]);

  const data = useMemo(() => {
    return [
      {
        name: "Mutual Funds",
        Interest: result.extraReturns,
        Invested: result.totalInvested,
      },
      {
        name: "Fixed Deposit (6.5%)",
        Interest: result.fdInterest,
        Invested: result.totalInvested,
      },
    ];
  }, [result]);

  return (
    <div className={styles.container}>
      <Row>
        <Col md={7} lg={7}>
          <Row>
            <Form>
              <FormGroup row>
                <Label for="amount" sm={7} className={styles.label}>
                  How much do you want to invest ?
                </Label>
                <Col sm={5}>
                  <Input
                    type="number"
                    name="amount"
                    placeholder=""
                    value={amount}
                    onChange={ChangeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="period" sm={7} className={styles.label}>
                  Investment Period ?
                </Label>
                <Col sm={5}>
                  <Input
                    type="number"
                    name="period"
                    placeholder=""
                    value={period}
                    onChange={ChangeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="expected-returns" sm={7} className={styles.label}>
                  Expected Annual Returns (%)
                </Label>
                <Col sm={5}>
                  <Input
                    type="number"
                    name="expected-returns"
                    placeholder=""
                    value={returns}
                    onChange={ChangeHandler}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Row>
          <Row className={styles.results}>
            <Col className={styles.resultItem}>
              <span className={styles.resultHeader}>Total Investment</span>
              <span className={styles.resultValue}>
                <Currency quantity={result.totalInvested} currency="INR" />
              </span>
            </Col>
            <Col className={styles.resultItem}>
              <span className={styles.resultHeader}>Total Interest </span>
              <span className={styles.resultValue}>
                <Currency quantity={result.extraReturns} currency="INR" />
              </span>
            </Col>
            <Col className={styles.resultItem}>
              <span className={styles.resultHeader}>Maturity Value </span>
              <span className={styles.resultValue}>
                <Currency quantity={result.totalReturns} currency="INR" />
              </span>
            </Col>
          </Row>
        </Col>
        <Col md={5} lg={5}>
          <BarChart data={data} />
        </Col>
      </Row>
    </div>
  );
}
