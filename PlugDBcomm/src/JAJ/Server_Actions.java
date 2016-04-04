package JAJ ;

import java.io.BufferedInputStream ;
import java.io.BufferedOutputStream ;
import java.io.ObjectInput ;
import java.io.ObjectInputStream ;
import java.io.ObjectOutput ;
import java.io.ObjectOutputStream ;
import java.net.Socket ;


public class Server_Actions implements Runnable
{
	// Attributs 
	private Socket client_socket = null ;
	private ObjectInput flux_in = null ;
	private ObjectOutput flux_out = null ;
	private String action_execute = null ;

	
	// Constructeur
	public Server_Actions ( Socket _client_socket )
	{
		client_socket = _client_socket ;
	}
	
	// Lecture du header
		private byte[] readBytes ( int numOfBytes ) 
		{
		    try
		    {
		    	byte[] buf = new byte[numOfBytes] ;
			    client_socket.getInputStream().read ( buf ) ;
			    return buf ;
		    }
		    catch ( Exception e ) 
	        {
	            System.err.println ( "Server : readBytes : bad read" ) ;
	            return null ;
	        }
	    }
		
		
		// Affichage d'octet
		private String convertAndPrint ( byte[] buf_in ) 
		{
		    StringBuilder sb = new StringBuilder() ;
		    for ( byte buf : buf_in ) 
		    {
		        sb.append ( String.format ( "%c ", buf ) ) ;
		    }
		    return sb.toString() ;
	    }
	
	
	// Thread
	public void run ()
	{
		try 
        {     
			System.out.println( "BBBBBB");
			// On créé les flux
	        //flux_out = new ObjectOutputStream ( new BufferedOutputStream ( client_socket.getOutputStream () ) ) ;
	        //flux_in = new ObjectInputStream ( new BufferedInputStream ( client_socket.getInputStream () ) ) ;  
	        
	        System.out.println( "BBBBBBCCCC");
	        
	        // On attend une commande
	        byte[] buf_msg = readBytes ( 200 ) ;
	        System.out.println ( "Payload: " + convertAndPrint ( buf_msg ) ) ;
	        
	        /* while ( ( action_execute = ( String ) flux_in.readObject () ) != null )
	        {     
	        	System.out.println ( "Message reçu : " + action_execute ) ;
	        	// Action TEST
	        	if ( action_execute.equalsIgnoreCase ( "TEST" ) )
				{		
	        		System.out.println ( "Server : Commande TEST reçue !!! " ) ;
					// On répond
	        		//flux_out.writeObject ( "Coucou le JAJ" ) ;
					//flux_out.flush () ;
				}
	        }	*/   
        } 
        catch ( Exception e ) 
        {
            System.err.println ( "Server : deconnection client" ) ;
        }
	}
}
