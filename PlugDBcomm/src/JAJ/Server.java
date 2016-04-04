package JAJ;

import java.io.IOException;
import java.net.ServerSocket;


public class Server
{	
	// Attributs statiques programmes
	private static ServerSocket server_socket = null ;
	private static Thread server_thread = null ;

	
	// Constructeur	
	public Server ()
	{      
	    // On se met en écoute sur le port 2211
	    try 
	    {
	    	// On met en place notre socket
			server_socket = new ServerSocket ( 2233 ) ;
			System.out.println ( "Server listen on port :  " + server_socket.getLocalPort () ) ;
			
			// On lance le Thread de connexion au serveur
			server_thread = new Thread ( new Server_Connection ( server_socket ) ) ;
			server_thread.start () ;
			
		} 
	    catch ( IOException e ) 
	    {
	    	e.printStackTrace () ;
			System.err.println ( "Server port already use : " + server_socket.getLocalPort () ) ;
		}	
	}     
}
