import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, getSchemaPath } from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';

/**
 * Simplified decorator for adding Swagger documentation.
 * @param tag - Tag to group the API endpoints
 * @param summary - Summary of the API endpoint
 * @param description - Description for the successful response
 * @param responseSchema - Optional schema for the response (DTO or raw data)
 * @param successStatus - Status code for the successful response (default: 200)
 * @param authRequired - Whether authorization is required (default: false)
 * @param errorResponses - Optional error response descriptions and status codes
 */
export function ApiDocs({
  tag,
  summary,
  description,
  responseSchema,
  successStatus = HttpStatus.OK,
  authRequired = false,
  errorResponses = {},
}: {
  tag?: string;
  summary: string;
  description: string;
  responseSchema?: any; // Allow any type (DTO or raw data)
  successStatus?: number;
  authRequired?: boolean;
  errorResponses?: {
    [statusCode: number]: string;
  };
}) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const decorators = [
      // Set up API tags and operation summary
      tag && ApiTags(tag),
      ApiOperation({ summary }),
      // Handle success response
      responseSchema &&
        ApiResponse({
          status: successStatus,
          description,
          schema:
            typeof responseSchema === 'object' && !Array.isArray(responseSchema)
              ? {
                  type: 'object',
                  properties: Object.keys(responseSchema).reduce(
                    (acc, key) => ({ ...acc, [key]: { type: typeof responseSchema[key] } }),
                    {},
                  ),
                  example: responseSchema,
                }
              : Array.isArray(responseSchema)
                ? { type: 'array', items: { $ref: getSchemaPath(responseSchema[0]) } }
                : { $ref: getSchemaPath(responseSchema) },
        }),
      // Handle optional authorization
      authRequired && ApiBearerAuth(),
      // Include common error responses
      ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal Server Error',
      }),
      authRequired &&
        ApiResponse({
          status: HttpStatus.UNAUTHORIZED,
          description: 'Authentication Required (Invalid or missing auth token or headers)',
        }),
      // Handle custom error responses
      ...Object.entries(errorResponses).map(([statusCode, desc]) =>
        ApiResponse({
          status: parseInt(statusCode, 10),
          description: desc,
        }),
      ),
    ].filter(Boolean); // Remove any undefined values

    applyDecorators(...decorators)(target, propertyKey, descriptor);
  };
}
