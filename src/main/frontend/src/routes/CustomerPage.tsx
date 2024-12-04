import {useParams, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getAccountLoans} from "@/lib/api.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditAccountDialog from "@/components/EditAccountDialog.tsx";


function CustomerPage() {
    const { id } = useParams<string>();
    const [searchParams, setSearchParams] = useSearchParams();
    const loanId = Number(searchParams.get("loan"));

    const [account, setAccount] = useState<Account | null>(null);
    const [accountLoans, setAccountLoans] = useState<Loan[]>([]);
    const [payments, setPayments] = useState<any[]>([]);

    const getAccount = useCallback(() => {
        fetch(`/api/account/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
            })
            .catch((error) => console.error(error));
    }
    , [id]);

    const getPayments = useCallback((loanId: number) => {
        return fetch(`/api/payments/${loanId}`)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }, []);

    const changeLoan = async (value: string) => {
        //setCurrentLoan(Number(value));
        setSearchParams({ loan: value });
        const payments = await getPayments(Number(value));
        setPayments(payments);
    };

    const formatCurreny = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    }

    const formatPercent = (percent: number) => {
        return `${percent}%`;
    }

    const updateAccount = (updateValues: any) => {
        fetch(`/api/account/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateValues),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error(response);
            }
        }).then((data) => {
            setAccount(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        const getThings = async () => {
            try {
                const loans: Loan[] = await getAccountLoans(id);
                setAccountLoans(loans);
                // if (loans.sort((a, b) => a.id - b.id)[0].id !== loanId)
                const payments = await getPayments(loans.sort((a, b) => a.id - b.id)[0].id);
                setPayments(payments);
            } catch (error) {
                console.error(error);
            }
        }

        getAccount();

        getThings();
    }, []);

    let amountLessPayments = accountLoans[accountLoans.findIndex((val) => val.id == loanId)]?.originAmount
    const chartData = [
        {
            month: accountLoans[accountLoans.findIndex((val) => val.id == loanId)]?.date,
            principal: amountLessPayments,
        },
        ...payments.map((payment) => {
            amountLessPayments -= payment.paymentAmount;
            return {
                month: payment.paymentDate,
                principal: amountLessPayments,
            }
        })
    ];

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

  return (
      <div className={"flex"}>
          <div className={"rounded-xl floating-shadow p-5 mr-4"}>
              <h1>{account?.username}</h1>
              <p className={"text-slate-400"}>{account?.email}</p>
              <p className={"text-slate-400"}>{account?.phoneNumber}</p>
              <p className={"font-bold"}>BANK INFO</p>
              <p>ROUTING: <span className={"text-slate-400"}>{account?.routingNumber ? " XXXXXX" + account?.routingNumber.slice(-4) : "not on file"}</span></p>
              <p>ACCOUNT: <span className={"text-slate-400"}>{account?.accountNumber ? "XXXXXX" + account?.accountNumber.slice(-4) : "not on file"}</span></p>
              <EditAccountDialog submit={updateAccount}/>
          </div>
          <div>
              <Tabs defaultValue={loanId.toString()} onValueChange={changeLoan} className={"rounded-xl floating-shadow p-2 mb-3 "}>
                  <TabsList>
                      {
                          accountLoans.map((loan) => (
                                <TabsTrigger key={loan.id} value={loan.id.toString()}>{"Loan #" + loan.id}</TabsTrigger>
                            ))
                      }
                  </TabsList>
              </Tabs>
              <div className={"rounded-xl floating-shadow p-4 w-[700px]"}>
                  <div className={"flex justify-between"}>
                      <h1>{formatCurreny(accountLoans[accountLoans.findIndex((val) => val.id == loanId)]?.currentAmount)}</h1>
                      <div className={"text-slate-400 text-right"}>
                          <p>{formatCurreny(accountLoans[accountLoans.findIndex((val) => val.id == loanId)]?.originAmount)}</p>
                          <p>{formatPercent(accountLoans[accountLoans.findIndex((val) => val.id == loanId)]?.interestRate)}</p>
                      </div>

                  </div>
                  <Separator className={"my-2"}/>
                  {payments.length > 1 ?
                      (<ChartContainer config={chartConfig}>
                          <AreaChart
                              accessibilityLayer
                              data={chartData}
                              margin={{
                                  left: 12,
                                  right: 12,
                                  top: 12,
                              }}
                          >
                              <CartesianGrid vertical={false} horizontal={false}/>
                              <XAxis
                                  dataKey="month"
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric"
                                  })}
                              />
                              <ChartTooltip
                                  cursor={false}
                                  content={<ChartTooltipContent hideLabel
                                                                valueFormatter={(value) => formatCurreny(value as number)}/>}
                              />
                              <Area
                                  dataKey="principal"
                                  type="linear"
                                  fill="var(--color-desktop)"
                                  fillOpacity={0.4}
                                  stroke="var(--color-desktop)"
                              />
                          </AreaChart>
                      </ChartContainer>
                      ) : (
                          <p>No payments have been made yet</p>
                      )
                  }
              </div>
          </div>
      </div>
  );
}

export default CustomerPage;