package org.sipd;

import org.types.*;
import java.sql.SQLException;
import java.util.ArrayList;


public class ReadingResultSet 
{
	// Fonction de lecture pour Select All
	public static ArrayList<Coffre> rsCoffreReaderAll( java.sql.ResultSet rs ) throws SQLException
	{
		// Variables
		int idGlobal;
		String url, log, pwd;
		
		// Liste de type "Coffre" afin d'y récupérer les résultats
		ArrayList<Coffre> listCoffre = new ArrayList<Coffre>();
		
		// Pour chaque résultat, on le transforme en objet de type coffre
		while (rs.next()) 
		{
			idGlobal = rs.getInt( 1 );
			url = rs.getString( 2 );
			log = rs.getString( 3 );
			pwd = rs.getString( 4 );
			
			// On l'ajoute à la liste
			listCoffre.add( new Coffre( idGlobal , url, log, pwd ));
		}
		
		// On retourne la liste
		return listCoffre;
	}	
	
	
	// Fonction de lecture pour Select Logs
	public static ArrayList<Coffre> rsCoffreReaderLogs( java.sql.ResultSet rs ) throws SQLException
	{
		// Variables
		String log, pwd;
		
		// Liste de type "Coffre" afin d'y récupérer les résultats
		ArrayList<Coffre> listCoffre = new ArrayList<Coffre>();
		
		// Pour chaque résultat, on le transforme en objet de type coffre
		while (rs.next()) 
		{
			log = rs.getString( 1 );
			pwd = rs.getString( 2 );
			
			// On l'ajoute à la liste
			listCoffre.add( new Coffre( 0 , "", log, pwd ));
		}
		
		// On retourne la liste
		return listCoffre;
	}
	
	
	// Fonction de lecture pour Select Logs
	public static ArrayList<Coffre> rsCoffreReaderId( java.sql.ResultSet rs ) throws SQLException
	{
		// Variables
		int idGlobal ;
		
		// Liste de type "Coffre" afin d'y récupérer les résultats
		ArrayList<Coffre> listCoffre = new ArrayList<Coffre>();
		
		// Pour chaque résultat, on le transforme en objet de type coffre
		while (rs.next()) 
		{
			idGlobal = rs.getInt( 1 );
			
			// On l'ajoute à la liste
			listCoffre.add( new Coffre( idGlobal , "", "", "" ));
		}
		
		// On retourne la liste
		return listCoffre;
	}
}
