import Sql from "./db/db.js";

export default class ModelHistoric  {
 static async historcUser(email , idCabelo, dataReserva, HORA){
    const db = await Sql.db()
    try {

    const {ID} = await db.get(`SELECT * FROM USER WHERE EMAIL = ?`, [
        email
    ])

    await db.exec(`BEGIN TRANSACTION`)

    await db.run(`INSERT INTO HISTORICOPAGAMENTO (ID_USER, ID_CABELO) VALUES (?,?)`, [
        ID,
        idCabelo,
    ])
    
    await db.exec(`COMMIT`)


    await db.exec(`BEGIN TRANSACTION`)

    await db.run(`INSERT INTO AGENDAMENTOS (IDUSER,ID_CABELO, DATA_AGENDAMENTO,HOURS_AGENDAMENTO ) VALUES (?,?, ?, ?)`, [
        ID,
        idCabelo,
        dataReserva,
        HORA
    ])

    await db.exec(`COMMIT`)
    } catch (error) {
        await db.exec(`ROLLBACK`)
    }
 }
}