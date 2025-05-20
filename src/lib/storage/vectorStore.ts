/**
 * Defines a generic interface for vector storage operations.
 */
export interface Point {
  /** Unique identifier for the vector point */
  id: string;
  /** The numeric vector values */
  vector: number[];
  /** Optional additional payload to store alongside the vector */
  payload?: Record<string, any>;
}

export interface Hit {
  /** Identifier of the matched point */
  id: string;
  /** Similarity or distance score */
  score: number;
  /** Original payload of the matched point */
  payload: any;
}

/**
 * Abstracts over a vector database implementation.
 */
export interface VectorStore {
  /**
   * Upsert one or more points into the store.
   * @param points Array of points to insert or update
   */
  upsert(points: Point[]): Promise<void>;

  /**
   * Query the store for nearest neighbors to a given vector.
   * @param vector The query vector
   * @param topK Number of nearest neighbors to return
   * @param filter Optional filter expression for metadata
   */
  query(vector: number[], topK: number, filter?: Record<string, any>): Promise<Hit[]>;

  /**
   * Delete points from the store by their IDs.
   * @param ids Array of point IDs to delete
   */
  delete(ids: string[]): Promise<void>;
}