package JAJ;

import java.io.IOException ;
import java.net.ServerSocket ;
import java.net.Socket ;


public class Server_Connection implements Runnable
{
	// Attributs
    private ServerSocket server_socket = null ;
    private Socket client_socket = null ;
    private Thread client_thread = null ;  

    
	// Constructeur    
    public Server_Connection ( ServerSocket _server_socket )
    {
    	server_socket = _server_socket ;
    }
    
    // Thread
    public void run() 
    {
        try 
        {
        	// Boucle infinie de connexion
        	while ( true )
        	{
        		// On accepte la connexion avec le client
                client_socket = server_socket.accept () ;
                System.out.println ( "Server : new client" ) ;
                
                // Thread : exécute actions en fonction des demandes 	// Autant de thread que de clients
				client_thread = new Thread ( new Server_Actions ( client_socket ) ) ;
				client_thread.start () ;
				
        	}
        } 
        catch ( IOException e ) 
        {
        	e.printStackTrace () ;
            System.err.println ( "Server : error connection" ) ;
        }
    }
}

