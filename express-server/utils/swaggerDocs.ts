export function generateGetDoc(
  path: string,
  summary: string,
  tags: string[],
  responses: any
) {
  return `
/**
 * @swagger
 * ${path}:
 *   get:
 *     summary: ${summary}
 *     tags: [${tags.join(", ")}]
 *     responses: ${JSON.stringify(responses, null, 2)}
 */
  `;
}

export function generatePostDoc(
  path: string,
  summary: string,
  tags: string[],
  requestBody: any,
  responses: any
) {
  return `
/**
 * @swagger
 * ${path}:
 *   post:
 *     summary: ${summary}
 *     tags: [${tags.join(", ")}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: ${JSON.stringify(requestBody, null, 2)}
 *     responses: ${JSON.stringify(responses, null, 2)}
 */
  `;
}

export function generatePutDoc(
  path: string,
  summary: string,
  tags: string[],
  requestBody: any,
  responses: any
) {
  return `
/**
 * @swagger
 * ${path}:
 *   put:
 *     summary: ${summary}
 *     tags: [${tags.join(", ")}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: ${JSON.stringify(requestBody, null, 2)}
 *     responses: ${JSON.stringify(responses, null, 2)}
 */
  `;
}

export function generateDeleteDoc(
  path: string,
  summary: string,
  tags: string[],
  responses: any
) {
  return `
/**
 * @swagger
 * ${path}:
 *   delete:
 *     summary: ${summary}
 *     tags: [${tags.join(", ")}]
 *     responses: ${JSON.stringify(responses, null, 2)}
 */
  `;
}
