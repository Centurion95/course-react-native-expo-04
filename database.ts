// database.ts
import { Platform } from 'react-native';

let db: any;

export async function initDB() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const SQLite = require('react-native-sqlite-storage');
    db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
  } else {
    const initSqlJs = require('sql.js');
    const SQL = await initSqlJs();
    db = new SQL.Database(); // en memoria
  }
}

export function executeQuery(sql: string, params: any[] = []) {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          sql,
          params,
          (_: any, results: any) => resolve(results),
          (_: any, error: any) => reject(error)
        );
      });
    });
  } else {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows: any[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  }
}
