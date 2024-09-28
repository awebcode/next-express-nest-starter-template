
  "use server";

import { ENV_VARS } from "@/config/env.config";


export async function formAction(x: any, formData: FormData) {
  console.log({x})

  const res = await fetch(`${ENV_VARS.clientUri}/user`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
//   if (res.ok) {
//       console.log({ user: data.user });
//       return {}
//   }

  return data;
};
