import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {

  const data = await request.json();

  // create an API key

  const result = await fetch(`${environment.BUCKET_URL}/consumers?with-api-key=true`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${environment.ZAPI_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: crypto.randomUUID(),
      managers: ["josh@zuplo.com"],
      metadata: data,
      tags: {
        name: data.name
      }
    })
  });

  if (!result.ok) {
    throw new Error(`Something went wrong: ${result.status} - ${result.statusText}`);
  }

  //redirect the user to api.rewiringamerica.com/docs
  return new Response(``, {
    status: 301,

    headers: {
      location: "https://api.rewiringmerica.org/docs"
    }
  });
}
