import { useParams } from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getAccountLoans} from "@/lib/api.ts";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";


function CustomerPage() {
    const { id } = useParams<string>();

    const [account, setAccount] = useState<Account | null>(null);
    const [accountLoans, setAccountLoans] = useState<Loan[]>([]);

    const getAccount = useCallback(() => {
        fetch(`/api/account/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
            })
            .catch((error) => console.error(error));
    }
    , [id]);

    const formatCurreny = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    }

    const formatPercent = (percent: number) => {
        return `${percent}%`;
    }

    useEffect(() => {
        getAccount();

        getAccountLoans(id)
            .then((data) => {
                setAccountLoans(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const chartData = [
        { month: "January", principal: 1000 },
        { month: "February", principal: 583 },
        { month: "March", principal: 523 },
        { month: "April", principal: 294 },
        { month: "May", principal: 209 },
        { month: "June", principal: 0.05 },
    ]
    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

  return (
      <div className={"flex"}>
          <div className={"rounded-3xl floating-shadow p-5 mr-4"}>
              <h1>{account?.username}</h1>
              <p className={"text-slate-400"}>{account?.email}</p>
              <p className={"text-slate-400"}>{account?.phoneNumber}</p>
              <p>BANK INFO</p>
              <p>ROUTING</p>
              <p>ACCOUNT</p>
              <Button variant={"outline"} size={"sm"} className={"w-full"}>Edit</Button>
          </div>
          <div className={"rounded-3xl floating-shadow p-5 w-[700px]"}>
              <div className={"flex justify-between"}>
                  <h1>{formatCurreny(accountLoans[0]?.currentAmount)}</h1>
                  <div className={"text-slate-400 text-right"}>
                      <p>{formatCurreny(accountLoans[0]?.originAmount)}</p>
                      <p>{formatPercent(accountLoans[0]?.interestRate)}</p>
                  </div>

              </div>
              <Separator className={"my-2"}/>
              <ChartContainer config={chartConfig}>
                  <AreaChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                          left: 12,
                          right: 12,
                      }}
                  >
                      <CartesianGrid vertical={false} />
                      <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel valueFormatter={(value) => formatCurreny(value as number)} />}
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
          </div>
      </div>
  );
}

export default CustomerPage;