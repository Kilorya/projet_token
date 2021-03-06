/*
 * @(#)Statement.java	1.48 06/10/18
 *
 * Copyright 2006 Sun Microsystems, Inc. All rights reserved.
 * SUN PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

package java.sql;

/**
 * <P>The object used for executing a static SQL statement
 * and returning the results it produces.
 * <P>
 * By default, only one <code>ResultSet</code> object per <code>Statement</code>
 * object can be open at the same time. Therefore, if the reading of one
 * <code>ResultSet</code> object is interleaved
 * with the reading of another, each must have been generated by
 * different <code>Statement</code> objects. All execution methods in the
 * <code>Statement</code> interface implicitly close a statment's current
 * <code>ResultSet</code> object if an open one exists.
 *
 * @see Connection#createStatement
 * @see ResultSet
 */
public interface Statement {

  /**
   * Executes the given SQL statement, which returns a single
   * <code>ResultSet</code> object.
   *
   * @param sql an SQL statement to be sent to the database, typically a
   *        static SQL <code>SELECT</code> statement
   * @return a <code>ResultSet</code> object that contains the data produced
   *         by the given query; never <code>null</code>
   * @exception SQLException if a database access error occurs,
   * this method is called on a closed <code>Statement</code> or the given
   *            SQL statement produces anything other than a single
   *            <code>ResultSet</code> object
   */
  ResultSet executeQuery(String sql) throws SQLException;

  /**
   * Executes the given SQL statement, which may be an <code>INSERT</code>,
   * <code>UPDATE</code>, or <code>DELETE</code> statement or an
   * SQL statement that returns nothing, such as an SQL DDL statement.
   *
   * @param sql an SQL Data Manipulation Language (DML) statement, such as <code>INSERT</code>, <code>UPDATE</code> or
   * <code>DELETE</code>; or an SQL statement that returns nothing,
   * such as a DDL statement.
   *
   * @return either (1) the row count for SQL Data Manipulation Language (DML) statements
   *         or (2) 0 for SQL statements that return nothing
   *
   * @exception SQLException if a database access error occurs,
   * this method is called on a closed <code>Statement</code> or the given
   *            SQL statement produces a <code>ResultSet</code> object
   */
  int executeUpdate(String sql) throws SQLException;

  /**
   * Releases this <code>Statement</code> object's database
   * and JDBC resources immediately instead of waiting for
   * this to happen when it is automatically closed.
   * It is generally good practice to release resources as soon as
   * you are finished with them to avoid tying up database
   * resources.
   * <P>
   * Calling the method <code>close</code> on a <code>Statement</code>
   * object that is already closed has no effect.
   * <P>
   * <B>Note:</B>When a <code>Statement</code> object is
   * closed, its current <code>ResultSet</code> object, if one exists, is
   * also closed.
   *
   * @exception SQLException if a database access error occurs
   */
  void close() throws SQLException;

  //----------------------------------------------------------------------

  //--------------------------JDBC 3.0-----------------------------

  /**
   * The constant indicating that the current <code>ResultSet</code> object
   * should be closed when calling <code>getMoreResults</code>.
   *
   * @since 1.4
   */
  int CLOSE_CURRENT_RESULT = 1;

  /**
   * The constant indicating that the current <code>ResultSet</code> object
   * should not be closed when calling <code>getMoreResults</code>.
   *
   * @since 1.4
   */
  int KEEP_CURRENT_RESULT = 2;

  /**
   * The constant indicating that all <code>ResultSet</code> objects that
   * have previously been kept open should be closed when calling
   * <code>getMoreResults</code>.
   *
   * @since 1.4
   */
  int CLOSE_ALL_RESULTS = 3;

  /**
   * The constant indicating that a batch statement executed successfully
   * but that no count of the number of rows it affected is available.
   *
   * @since 1.4
   */
  int SUCCESS_NO_INFO = -2;

  /**
   * The constant indicating that an error occured while executing a
   * batch statement.
   *
   * @since 1.4
   */
  int EXECUTE_FAILED = -3;

  /**
   * The constant indicating that generated keys should be made
   * available for retrieval.
   *
   * @since 1.4
   */
  int RETURN_GENERATED_KEYS = 1;

  /**
   * The constant indicating that generated keys should not be made
   * available for retrieval.
   *
   * @since 1.4
   */
  int NO_GENERATED_KEYS = 2;

  /**
   * Retrieves any auto-generated keys created as a result of executing this
   * <code>Statement</code> object. If this <code>Statement</code> object did
   * not generate any keys, an empty <code>ResultSet</code>
   * object is returned.
   *
   *<p><B>Note:</B>If the columns which represent the auto-generated keys were not specified,
   * the JDBC driver implementation will determine the columns which best represent the auto-generated keys.
   *
   * @return a <code>ResultSet</code> object containing the auto-generated key(s)
   *         generated by the execution of this <code>Statement</code> object
   * @exception SQLException if a database access error occurs or
   * this method is called on a closed <code>Statement</code>
   * @throws SQLFeatureNotSupportedException  if the JDBC driver does not support this method
   * @since 1.4
   */
  ResultSet getGeneratedKeys() throws SQLException;

  /**
   * Executes the given SQL statement and signals the driver with the
   * given flag about whether the
   * auto-generated keys produced by this <code>Statement</code> object
   * should be made available for retrieval.  The driver will ignore the
   * flag if the SQL statement
   * is not an <code>INSERT</code> statement, or an SQL statement able to return
   * auto-generated keys (the list of such statements is vendor-specific).
   *
   * @param sql an SQL Data Manipulation Language (DML) statement, such as <code>INSERT</code>, <code>UPDATE</code> or
   * <code>DELETE</code>; or an SQL statement that returns nothing,
   * such as a DDL statement.
   *
   * @param autoGeneratedKeys a flag indicating whether auto-generated keys
   *        should be made available for retrieval;
   *         one of the following constants:
   *         <code>Statement.RETURN_GENERATED_KEYS</code>
   *         <code>Statement.NO_GENERATED_KEYS</code>
   * @return either (1) the row count for SQL Data Manipulation Language (DML) statements
   *         or (2) 0 for SQL statements that return nothing
   *
   * @exception SQLException if a database access error occurs,
   *  this method is called on a closed <code>Statement</code>, the given
   *            SQL statement returns a <code>ResultSet</code> object, or
   *            the given constant is not one of those allowed
   * @exception SQLFeatureNotSupportedException if the JDBC driver does not support
   * this method with a constant of Statement.RETURN_GENERATED_KEYS
   * @since 1.4
   */
  int executeUpdate(String sql, int autoGeneratedKeys) throws SQLException;

}
