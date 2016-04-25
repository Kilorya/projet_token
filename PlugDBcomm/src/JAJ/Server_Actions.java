package JAJ ;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket ;
import org.sipd.Main;


public class Server_Actions implements Runnable
{
	// Attributs 
	private Socket client_socket = null ;
	private BufferedReader flux_in = null ;
	private PrintWriter flux_out = null ;
	private char[] msg_recu ;
	private int off = 0 ;
	private int len = 100 ;
	private String msg_dechif = "" ;
	private String[] msg_split ;
	private Thread req_thread = null ; 
	private Main token ;

	
	// Constructeur
	public Server_Actions ( Socket _client_socket, Main _token )
	{
		client_socket = _client_socket ;
		token = _token ;
	}
	
	
	// TMP -----------------------------------------------------
	// Fonction dechiffrement
	private String dechiffrement ( String in ) 
	{
		return in ;
	}
	
	
	// Fonction de conversion unit16 to char
	private String fromCharCode ( int... codePoints )
	{
		return new String ( codePoints, 0, codePoints.length ) ;
	}
	
	
	// Fonction de concatenation chartoString
	private String concaChar ( char[] in )
	{
		StringBuffer buf = new StringBuffer ( in.length ) ;
    	for ( int i = 0; i < in.length; i++ )
    	{
    		buf.append(fromCharCode ( in[i] ));
    	}
    	return buf.toString() ;
	}
	
	
	// Thread
	public void run ()
	{
		try 
        {     
			// Debug
			System.out.println ( "Server : flux creation" ) ;
			
			// On créé les flux
			flux_out = new PrintWriter ( client_socket.getOutputStream(), true ) ; 
			flux_in = new BufferedReader ( new InputStreamReader ( client_socket.getInputStream() ) ) ;
 
			// Debug
	        System.out.println ( "Server : flux done" ) ;
	        
	        // Boucle infinie
	        while (true)//( !flux_out.checkError() )
	        {     
	        	// Ini
	        	off = 0 ;
	        	len = 199 ;
	        	msg_recu = new char[len+1] ;
	        	
	        	// Lecture
	        	if ( ( flux_in.read ( msg_recu, off, len ) != -1 ) )
	        	{
	        		// Debug
	        		System.out.println ( "Server : new message : " + concaChar ( msg_recu ) ) ;

		        	// Déchiffrement
		        	msg_dechif = dechiffrement ( concaChar ( msg_recu ) ) ;
		        	
		        	// Debug
		        	System.out.println ( "Server : readable message : " + msg_dechif ) ;
	        		
		        	// On pré-découpe le message -> si requête à la suite on les sépare pour tout traiter
		        	msg_split = msg_dechif.split ( "@" ) ;
		        	
		        	// Pour chaque requête, on appelle le traitement dessus
		        	for ( int i = 0; i < msg_split.length - 1 ; i++ )
		        	{
		        		req_thread = new Thread ( new Request ( msg_split[i], token, flux_out ) ) ;
		    			req_thread.start () ;
		        	}
	        	}
	        	
	        	// Test de la fermeture client
	        	//flux_out.println ( "OUT*EOF@" ) ;
	        }  
	        
	        // Debug
	        //System.err.println ( "Server : deconnection client" ) ;
        } 
        catch ( Exception e ) 
        {
            System.err.println ( "Server : deconnection client with error" ) ;
        }
	}
}
