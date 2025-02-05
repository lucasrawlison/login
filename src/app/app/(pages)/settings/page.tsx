"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  interface Configs {
    id: string;
    taskOrder: string;
  }

  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadedUserConfigs, setLoadedUserConfigs] = useState<Configs | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getActiveUser = async () => {
      try {
        const response = await axios.post("/api/getActiveUser", {
          email: session?.user?.email,
        });

        const activeUser = response.data.user;
        console.log(response.data);
        setLoadedUserConfigs(activeUser.configs);
      } catch (error) {
        console.log(error);
      }
    };
    getActiveUser();
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router, status]);


  const handleChangeConfig = (checked: boolean) => {
    setLoadedUserConfigs((prev) => prev ? { ...prev, taskOrder: checked ? "asc" : "desc" } : null);

  }

  const handleSaveConfigs = async () => {
    try {
      setIsLoading(true);
      console.log(loadedUserConfigs);
      const response = await axios.post("/api/updateUserConfigs", {
        configs: loadedUserConfigs,
      });
      setLoadedUserConfigs(response.data.configs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

  }




  return (
    <div className="container mx-auto p-6 overflow-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configurações do usuário</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="h-32">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ordem de exibição das tarefas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mt-3 flex flex-row items-center space-x-2">
              <Switch
                onCheckedChange={handleChangeConfig}
                checked={loadedUserConfigs?.taskOrder === "asc"}></Switch>
              <Label>
                {" "}
                {loadedUserConfigs?.taskOrder === "asc"
                  ? "Mais antigas primeiro"
                  : "Mais novas primeiro"}
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end mt-6">
        <Button disabled={isLoading} onClick={()=>handleSaveConfigs()}  >{isLoading ? <LoaderCircle className=" animate-spin"/> : "Salvar"}</Button>
      </div>
    </div>
  );
}
