import { ApiProperty } from '@nestjs/swagger';

/**
 * Base response DTO for API responses
 * @template T The type of data contained in the response
 */
export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Success status of the response', example: true })
  success: boolean;

  @ApiProperty({ description: 'Response message', example: 'Operation successful' })
  message: string;

  @ApiProperty({ description: 'Response data' })
  data: T;

  constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  /**
   * Creates a successful response
   * @param data The data to include in the response
   * @param message Optional success message
   * @returns A new ApiResponseDto instance with success=true
   */
  static createSuccess<T>(data: T, message = 'Operation successful'): ApiResponseDto<T> {
    return new ApiResponseDto<T>(true, message, data);
  }

  /**
   * Creates an error response
   * @param message Error message
   * @param data Optional data to include with the error
   * @returns A new ApiResponseDto instance with success=false
   */
  static createError<T = null>(message = 'Operation failed', data?: T): ApiResponseDto<T> {
    return new ApiResponseDto<T>(false, message, data as T);
  }
  
  // Keep the original methods for backward compatibility
  /** @deprecated Use createSuccess instead */
  static success<T>(data: T, message = 'Operation successful'): ApiResponseDto<T> {
    return this.createSuccess(data, message);
  }

  /** @deprecated Use createError instead */
  static error<T = null>(message = 'Operation failed', data?: T): ApiResponseDto<T> {
    return this.createError(message, data);
  }
}

/**
 * Metadata for paginated responses
 */
export class PaginationMeta {
  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 0 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  totalPages: number;

  constructor(total: number, page: number, limit: number) {
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}

/**
 * Response DTO for paginated data
 * @template T The type of items in the paginated collection
 */
export class PaginatedResponseDto<T> extends ApiResponseDto<T[]> {
  @ApiProperty({ 
    description: 'Pagination metadata',
    type: PaginationMeta
  })
  meta: PaginationMeta;

  constructor(
    success: boolean,
    message: string,
    data: T[],
    meta: PaginationMeta
  ) {
    super(success, message, data);
    this.meta = meta;
  }

  /**
   * Creates a paginated success response
   * @param data Array of items for the current page
   * @param total Total number of items across all pages
   * @param page Current page number (zero-based)
   * @param limit Number of items per page
   * @param message Optional success message
   * @returns A new PaginatedResponseDto instance
   */
  static createPaginatedSuccess<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Operation successful'
  ): PaginatedResponseDto<T> {
    const meta = new PaginationMeta(total, page, limit);
    return new PaginatedResponseDto<T>(true, message, data, meta);
  }

  // Keep the original method for backward compatibility
  /** @deprecated Use createPaginatedSuccess instead */
  static successPaginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Operation successful'
  ): PaginatedResponseDto<T> {
    return this.createPaginatedSuccess(data, total, page, limit, message);
  }
} 