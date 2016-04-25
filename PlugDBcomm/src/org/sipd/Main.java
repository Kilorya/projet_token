package org.sipd;

import org.types.*;
//import java.io.PrintWriter;
import java.util.List;
//import org.inria.database.QEPng;
import test.jdbc.Tools;


public class Main extends Tools 
{
	// Variables
	//static public Main projet;
	static public int compteur  = 0 ;
	private StringBuffer buf ;
	
	
	// Fonction d'insertion
	public boolean insertion( String _url, String _log, String _pwd )
	{
		// Variables
		java.sql.PreparedStatement ps;
		int res = 0;
		
		// Requête
		try
		{
			// On inc l'ID
			compteur++;
			
			// On indique quel méta data il faut utiliser
			ps = ( (org.inria.jdbc.Connection)this.db ).prepareStatement( QEP_IDs.EP_Coffre.Coffre_INSERT );
			
			// On bind les paramètres
			ps.setInt( 1, compteur ); 
			ps.setString( 2, _url );
			ps.setString( 3, _log ); 
			ps.setString( 4, _pwd );
			
			// On exécute
			res = ps.executeUpdate();
		} 
		catch (Exception e) 
		{
			this.out.println( "Error Insertion, res + " + res + "\n" );
			e.printStackTrace();
			return false ;
		}	
		
		return true ;
	}
	
	
	// Fonction de select : all
	public String selection_all()
	{
		// Variables
		java.sql.PreparedStatement ps;
		
		// Requête
		try
		{
			// On indique quel méta data il faut utiliser
			ps = ( (org.inria.jdbc.Connection)this.db ).prepareStatement( QEP_IDs.EP_Coffre.Coffre_SELECT_ALL );
			
			// On exécute la requête en récupérant le résultat dans un ResultSet
			org.inria.jdbc.ResultSet resultSet = (org.inria.jdbc.ResultSet) ps.executeQuery();
			
			// On récupère ces résultats dans une liste de type "Coffre"
			List<Coffre> listCoffre = ReadingResultSet.rsCoffreReaderAll(resultSet);
			
			// DEBUG
			System.out.println( "\nEXECUTING QUERY : \" SELECT * FROM Coffre;\"" );
			
			// Affichage et récupération des tuples
			buf = new StringBuffer ( listCoffre.size() * 8 ) ;
			
			System.out.println( "\nRow \tIdGlobal \tUrl \t\tLog \t\tPwd" );
			for( int i = 0; i < listCoffre.size(); i++ )
			{
				Coffre tuple = (Coffre) listCoffre.get(i);
				
				buf.append ( tuple.getIdGlobal() ) ;
				buf.append ( "$" ) ;
				buf.append ( tuple.getUrl() ) ;
				buf.append ( "$" ) ;
				buf.append ( tuple.getLog() ) ;
				buf.append ( "$" ) ;
				buf.append ( tuple.getPwd() ) ;
				buf.append ( ";" ) ;
				
				System.out.println( i +
									" \t" + tuple.getIdGlobal() + 
									" \t" + tuple.getUrl() + 
									" \t\t" + tuple.getLog() + 
									" \t\t" + tuple.getPwd() );
			}
			System.out.println( "Tous les tuples ont été affichés \n" );
		} 
		catch (Exception e) 
		{
			this.out.println( "Error Select All \n" );
			e.printStackTrace();
			return null ;
		}
		
    	return buf.toString() ;
	}
	
	
	// Fonction de select : logs
	public String selection_logs( String _url )
	{
		// Variables
		java.sql.PreparedStatement ps;
		
		// Requête
		try
		{
			// On indique quel méta data il faut utiliser
			ps = ( (org.inria.jdbc.Connection)this.db ).prepareStatement( QEP_IDs.EP_Coffre.Coffre_SELECT_LOGS );
			ps.setString( 1, _url );
			
			// On exécute la requête en récupérant le résultat dans un ResultSet
			org.inria.jdbc.ResultSet resultSet = (org.inria.jdbc.ResultSet) ps.executeQuery();
			
			// On récupère ces résultats dans une liste de type "Coffre"
			List<Coffre> listCoffre = ReadingResultSet.rsCoffreReaderLogs(resultSet);
			
			// DEBUG
			System.out.println( "\nEXECUTING QUERY : \" SELECT log, pwd FROM Coffre WHERE url = ?;\"" );
			
			// Affichage et récupération des tuples
			buf = new StringBuffer ( listCoffre.size() * 4 ) ;
						
			System.out.println( "\nRow \tLog \t\tPwd" );
			for( int i = 0; i < listCoffre.size(); i++ )
			{
				Coffre tuple = (Coffre) listCoffre.get(i);
				
				buf.append ( tuple.getLog() ) ;
				buf.append ( "$" ) ;
				buf.append ( tuple.getPwd() ) ;
				buf.append ( ";" ) ;
				
				System.out.println( i +
									" \t" + tuple.getLog() + 
									" \t\t" + tuple.getPwd() );
			}
			System.out.println( "Tous les tuples ont été affichés \n" );
		} 
		catch (Exception e) 
		{
			this.out.println( "Error Select Logs \n" );
			e.printStackTrace();
			return null ;
		}
		
		return buf.toString() ;
	}
	
	
	public int selection_id( String _url )
	{
		// Variables
		java.sql.PreparedStatement ps;
		Coffre tuple ;
		int id = -1 ;
		
		// Requête
		try
		{
			// On indique quel méta data il faut utiliser
			ps = ( (org.inria.jdbc.Connection)this.db ).prepareStatement( QEP_IDs.EP_Coffre.Coffre_SELECT_ID );
			ps.setString( 1, _url );
			
			// On exécute la requête en récupérant le résultat dans un ResultSet
			org.inria.jdbc.ResultSet resultSet = (org.inria.jdbc.ResultSet) ps.executeQuery();
			
			// On récupère ces résultats dans une liste de type "Coffre"
			List<Coffre> listCoffre = ReadingResultSet.rsCoffreReaderId(resultSet);
			
			// DEBUG
			System.out.println( "\nEXECUTING QUERY : \" SELECT id FROM Coffre WHERE url = ?;\"" );
			
			// Affichage des tuples
			System.out.println( "\nRow \tId" );
			for( int i = 0; i < listCoffre.size(); i++ )
			{
				tuple = (Coffre) listCoffre.get(i);
				id = tuple.getIdGlobal() ;
				System.out.println( i + " \t" + id );
			}
			System.out.println( "Tous les tuples ont été affichés \n" );
		} 
		catch (Exception e) 
		{
			this.out.println( "Error Select Id \n" );
			e.printStackTrace();
		}
		
		// Retour
		return id ;
	}
	
	
	// Fonction de update
	public boolean update( String _url, String _log, String _pwd )
	{
		// Variables
		java.sql.PreparedStatement ps;
		int res = 0;
		
		// Requête
		try
		{			
			// On récupère l'ID associé à l'url
			int id = this.selection_id ( _url ) ;
			
			if ( id != -1 )
			{
				// On indique quel méta data il faut utiliser
				ps = ( (org.inria.jdbc.Connection)this.db ).prepareStatement( QEP_IDs.EP_Coffre.Coffre_UPDATE );
				
				// On bind les paramètres
				ps.setString( 1, _log );
				ps.setString( 2, _pwd ); 
				ps.setInt( 3, id );
				
				// On exécute
				res = ps.executeUpdate();
			}
			else
				this.out.println( "Error Update : bad ID \n" );
		} 
		catch (Exception e) 
		{
			this.out.println( "Error Update, res + " + res + "\n" );
			e.printStackTrace();
			return false ;
		}		
		
		return true ;
	}
	
	
	// Fonction de suppression
	public boolean delete( String _url )
	{
		// Variables
		java.sql.PreparedStatement ps;
		int res = 0;
		
		// Requête
		try
		{			
			// On récupère l'ID associé à l'url
			int id = selection_id ( _url ) ;
			
			if ( id != -1 )
			{
				// On indique quel méta data il faut utiliser
				ps = ( (org.inria.jdbc.Connection)this.db ).prepareStatement( QEP_IDs.EP_Coffre.Coffre_DELETE );
				
				// On bind les paramètres 
				ps.setInt( 1, id );
				
				// On exécute
				res = ps.executeUpdate();
			}
			else
				this.out.println( "Error Delete : bad ID \n" );
		} 
		catch (Exception e) 
		{
			this.out.println( "Error Delete, res + " + res + "\n" );
			e.printStackTrace();
			return false ;
		}		
		
		return true ;
	}
	
	
	// Main
	/*public static void main(String argv[])
	{
		projet = new Main();
		projet.out = new PrintWriter(java.lang.System.out);
		String dbmsHost = null;
		
		if (argv.length == 1)
		{
			dbmsHost = argv[0];
		}
		else
		{
			projet.out.println("Missing argument: e.g. COM3, /dev/ttyACM0, ...");
			if (projet.out != null)
				projet.out.close();
			return;	    	
		}

		// this not a performance test ==> output is produced:
		perf = 0;
		
		try 
		{
			
			// initialize the driver:
			projet.init();

			// connect without authentication
			projet.openConnection(dbmsHost, null);
			// load the DB schema
			String schema = Schema.META;

			// load the DB schema
			projet.Install_DBMS_MetaData(schema.getBytes(), 0);
			
			// load and install QEPs
			Class<?>[] executionPlans = new Class[] { QEP.class };
			QEPng.loadExecutionPlans( QEP_IDs.class, executionPlans );
			QEPng.installExecutionPlans( projet.db );
			
			
			//------------------------------
			//------------------------------
			// Start
			//------------------------------
			//------------------------------
			compteur = 0;
			
			insertion ( "http://jaj.com", "Aurelien", "azerty" ) ;
			insertion ( "http://hpe.com", "Thierry", "eds" ) ;
			insertion ( "http://insa.fr", "Hugator", "hipster" ) ;
			selection_all() ;
			selection_logs ( "http://hpe.com" ) ;
			selection_id ( "http://insa.fr" ) ;
			update ( "http://jaj.com", "Valentin", "HEyhey" ) ;
			selection_all();
			delete ( "http://hpe.com" ) ;
			selection_all();
			


			//------------------------------
			//------------------------------
			// End
			//------------------------------
			//------------------------------
			

			projet.Desinstall_DBMS_MetaData();
			projet.Shutdown_DBMS();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		finally
		{
			if (projet.out != null)
			{
				projet.out.close();
			}
		}
		
		//EchoEndPoint appli_server = new EchoEndPoint () ;
		//while (true) {}
	}*/
}