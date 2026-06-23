import apiFetch from "./api";

export type Script = {
  id: number;
  status: string;

  input_json: {
    prompt: string;
    platform: string;
    style: string;
    duration: number;
  };

  output_json?: {
    result?: {
      hook: string;
      body: string;
      cta: string;
    };
    error?: string;
  };

  created_at: string;
};

export async function getScripts() {
  return apiFetch<Script[]>("/scripts");
}

export async function getScript(id: string) {
  return apiFetch<Script>(`/scripts/${id}`);
}