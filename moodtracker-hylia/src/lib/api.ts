// src/lib/api.ts

/*  
  API client do MoodTracker
  -------------------------
  - Lê VITE_API_BASE_URL do .env
  - Expõe funções organizadas por recurso (tips, checkins, risk, users)
  - Usa apenas fetch()
  - Cada req faz tratamento de erro padronizado
*/

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!BASE_URL) {
  console.error("❌ ERRO: VITE_API_BASE_URL não definido no .env");
}

// Utilitário básico para requisições
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(
      `Erro HTTP ${resp.status} ao acessar ${path}: ${txt || resp.statusText}`
    );
  }

  return resp.json() as Promise<T>;
}

/* ============================
   TIPS
============================ */

// Tipo compatível com o backend
export type Tip = {
  id: number;
  titulo: string;
  descricao: string;
  categoria?: string;
};

export function getRandomTip(): Promise<Tip> {
  return request<Tip>("/tips/random");
}

/* ============================
   USERS
============================ */

export type User = {
  id?: number;
  idUsuario?: number;
  nome?: string;
  email?: string;
};

export function getUsers(): Promise<User[]> {
  return request<User[]>("/users");
}

export function getUserById(id: number): Promise<User> {
  return request<User>(`/users/${id}`);
}

export type NewUserInput = {
  nome: string;
  email: string;
  senha: string;
};

export function createUser(data: NewUserInput): Promise<User> {
  return request<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ============================
   CHECKINS
============================ */

export type Checkin = {
  id: number;
  userId: number;
  humor: number;
  energia: number;
  cargaTrabalho: number;
  dataRegistro: string;
};

export function getUserCheckins(
  userId: number,
  params?: { from?: string; to?: string }
): Promise<Checkin[]> {
  const search = new URLSearchParams(params as any).toString();
  const qs = search ? `?${search}` : "";
  return request<Checkin[]>(`/users/${userId}/checkins${qs}`);
}

export function createCheckin(
  userId: number,
  data: {
    humor: number;
    energia: number;
    cargaTrabalho: number;
  }
): Promise<Checkin> {
  return request<Checkin>(`/users/${userId}/checkins`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCheckin(
  id: number,
  data: {
    humor?: number;
    energia?: number;
    cargaTrabalho?: number;
  }
): Promise<Checkin> {
  return request<Checkin>(`/checkins/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteCheckin(id: number): Promise<void> {
  return request<void>(`/checkins/${id}`, {
    method: "DELETE",
  });
}

/* ============================
   ANALYSIS / AI
============================ */

export type AnalysisResult = {
  score: number; // 0.0 a 1.0
  summary: string;
};

export function analyzeCheckin(id: number): Promise<AnalysisResult> {
  return request<AnalysisResult>(`/users/checkins/${id}/analysis`, {
    method: "POST",
  });
}

/* ============================
   RISK
============================ */

export type RiskResult = {
  badge: string;
  series: number[];
};

export function getUserRisk(
  userId: number,
  days = 7
): Promise<RiskResult> {
  return request<RiskResult>(`/users/${userId}/risk?days=${days}`);
}

/* ============================
   FEEDBACK
============================ */

export type Feedback = {
  id?: number;
  idUsuario?: number;
  usuarioId?: number;
  avaliacao?: number;
  comentario?: string;
};

export function sendFeedback(data: {
  usuarioId: number;
  avaliacao: number;
  comentario: string;
}): Promise<Feedback> {
  return request<Feedback>("/feedbacks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getUserFeedback(userId: number): Promise<Feedback[]> {
  return request<Feedback[]>(`/feedbacks/users/${userId}`);
}

/* ============================
   CONFIG
============================ */

export type Config = {
  id: number;
  userId: number;
  tema: string;
  notificacaoAtiva: number | null;
  horarioLimite: string | null;
  fusoHorario: string | null;
};

export function getUserConfig(userId: number): Promise<Config> {
  return request<Config>(`/config/users/${userId}`);
}

export function upsertConfig(data: {
  userId: number;
  tema?: string;
  notificacaoAtiva?: boolean | null;
  horarioLimite?: string | null;
  fusoHorario?: string | null;
}): Promise<Config> {
  return request<Config>("/config", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
