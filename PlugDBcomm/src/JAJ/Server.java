package JAJ;

import java.io.IOException;
import java.net.ServerSocket;
import org.sipd.Main;


public class Server
{	
	// Attributs statiques programmes
	private static ServerSocket server_socket = null ;
	private static Thread server_thread = null ;
	
	
	// Attributs
	private int port = 2222 ;

	
	// Constructeur	
	public Server ( Main token )
	{      
	    // On se met en écoute sur le port
	    try 
	    {
	    	// On met en place notre socket
			server_socket = new ServerSocket ( port ) ;
			System.out.println ( "Server listen on port :  " + server_socket.getLocalPort () ) ;
			
			// On lance le Thread de connexion au serveur
			server_thread = new Thread ( new Server_Connection ( server_socket, token ) ) ;
			server_thread.start () ;
			
		} 
	    catch ( IOException e ) 
	    {
	    	e.printStackTrace () ;
			System.err.println ( "Server port already use : " + server_socket.getLocalPort () ) ;
		}	
	}     
}
