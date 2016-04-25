package JAJ;

import java.io.PrintWriter;

import org.sipd.Main;


public class Request implements Runnable
{
	// Attribut
	private String req ;
	private String action ;
	private String argv ;
	private String[] msg_split ;
	private String[] argv_split ;
	private Main token ;
	private PrintWriter flux_out = null ;
	private StringBuffer buffer ;
	private String reponse ;
	private boolean rep ;
	
	
	// Constructeur
	public Request ( String _req, Main _token, PrintWriter _out )
	{
		req = _req ;
		token = _token ;
		flux_out = _out ;
		System.out.println ( "Request : in process : " + req ) ;
	}
	
	
	// Fonction de concatenation StringtoString
	private String concaString ( String in, int mode )
	{
		StringBuffer buf = new StringBuffer ( in.length() ) ;
    	if ( mode == 0 )
    	{
    		for ( int i = 0; i < in.length(); i = i+2 )
        	{
        		buf.append ( in.charAt ( i ) ) ;
        	}
    	}
    	else if ( mode == 1 )
    	{
    		for ( int i = 1; i < in.length(); i = i+2 )
        	{
        		buf.append ( in.charAt ( i ) ) ;
        	}
    	}
    	return buf.toString() ;
	}
		
	
	// Thread
	public void run ()
	{
		// On découpe la requête selon le séparateur "*"
		msg_split = req.split ( "\\*" ) ;
		
		// On vérifie que la requête est "bien formée"
		if ( msg_split.length != 3 )
		{
			System.err.println ( "Request : 3 params are expected" ) ;
			return ;
		}
		
		// On prépare les chaînes après split (forme hexa pas bonne )
		action = concaString ( msg_split[0], 0 ) ;
		argv = concaString ( msg_split[1], 1 ) ;
		
		System.err.println ( "DEBUG" ) ;
		System.err.println ( action ) ;
		System.err.println ( argv ) ;
		System.err.println ( "DEBUG END" ) ;
		
		// En fonction de l'action souhaitée, on prépare les arguments puis on appelle le bon traitement	
		if ( action.equals ( "GET" ) )
		{
			System.out.println ( "GET : " + argv ) ;
			
			reponse = token.selection_logs ( argv ) ;
			buffer = new StringBuffer ( 3 ) ;
			buffer.append ( "GET*" ) ;
			buffer.append ( reponse ) ;
			buffer.append ( "*EOF@" ) ;
			flux_out.println ( buffer.toString() ) ;
			flux_out.flush() ;
			
			System.out.println ( "GET : END" ) ;
		}
		else if ( action.equals ( "SAVE" ) )
		{
			// On découpe les arguments selon le séparateur ";"
			argv_split = argv.split ( ";" ) ;
			
			// On vérifie que l'on a le bon nombre d'arguments
			if ( argv_split.length != 3 )
			{
				System.err.println ( "Request : 3 argvs are expected" ) ;
				return ;
			}
			
			System.out.println ( "SAVE : " + argv ) ;
			
			rep = token.insertion ( argv_split[0], argv_split[1], argv_split[2]);
			if ( rep == true ) 
			{
				flux_out.println ( "SAVE*DONE*EOF@" ) ;
				flux_out.flush() ;
			}
			else
			{
				flux_out.println ( "SAVE*FALSE*EOF@" ) ;
				flux_out.flush() ;
			}
			
			System.out.println ( "SAVE : END" ) ;
		}
		else
		{
			System.err.println ( "Request : unknown action" ) ;
		}
	}
}
