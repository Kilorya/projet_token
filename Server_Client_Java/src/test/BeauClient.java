package test;

/*import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
//import java.net.Socket;
//import java.net.UnknownHostException;
//import java.net.SocketServer;*/
import java.net.*;
import java.io.*;

public class BeauClient {

	private Socket socket = null;
	
	private ServerSocket serverSocket = null; 
	
	protected Socket clientSocketDistant;
	
	protected static boolean Continue = true;

	public static void main(String[] args) throws UnknownHostException, IOException, ClassNotFoundException {
	//throws permet de déleguer la responsabilité les erreurs à la méthode appelante
		BeauClient client = new BeauClient();
		
		BeauClient server = new BeauClient();
		
		server.CreateServer(1234);

				/*String ip = "127.0.0.1";
				int port = 1234;
				client.socketConnect(ip, port);

				String message = "Hello world";


				System.out.println("Envoi: " + message);
				String returnStr = client.repete(message);
				System.out.println("Reception: " + returnStr);*/
		
				
	}
	
	private void socketConnect(String ip, int port) throws UnknownHostException, IOException {
		
		System.out.println("Connexion en cours..."); this.socket = new Socket(ip, port); 
		
	}
	
	private void CreateServer(int port) {

		 try { 
	         serverSocket = new ServerSocket(port);//server socket ne marche que dans un try
	         System.out.println ("Serveur créé");
	         try { 
	              while (Continue)
	                 {
	                  System.out.println ("Attente de connexion");
	                  ClientCreate (serverSocket.accept()); 
	                 }
	             } 
	         catch (IOException e) 
	             { 
	              System.err.println("Echec conexion client"); 
	              System.exit(1); 
	             } 
	        } 
	    catch (IOException e) 
	        { 
	         System.err.println("Impossible de créer le serveur sur le port:" + port); 
	         System.exit(1); 
	        } 
	    finally
	        {
	         try {
	              serverSocket.close(); 
	             }
	         catch (IOException e)
	             { 
	              System.err.println("Impossible de stopper le serveur sur le port:" + port); 
	              System.exit(1); 
	             } 
	        }
	}
	
	 private void ClientCreate (Socket clientSoc) {
		System.out.println("Client connecté");
	    clientSocketDistant = clientSoc;
	    StartCom();
	   }
	 
	 private void StartCom(){

		    try { 
		         PrintWriter out = new PrintWriter(clientSocketDistant.getOutputStream(), 
		                                      true); 
		         BufferedReader in = new BufferedReader( 
		                 new InputStreamReader( clientSocketDistant.getInputStream())); 

		         String inputLine; 
		         
		         out.println("JAJ !");
		         
		         while ((inputLine = in.readLine()) != null) 
		             { 
		              System.out.println ("Server: " + inputLine); 
		              out.println(inputLine); 

		              if (inputLine.equals("Exit")) 
		                  break; 

		              if (inputLine.equals("Server out")) 
		                  Continue = false; 
		             } 

		         out.close(); 
		         in.close(); 
		         clientSocketDistant.close(); 
		        } 
		    catch (IOException e) 
		        { 
		         System.err.println("Probleme de communication avec le serveur");
		         System.exit(1); 
		        }
	 }


	//reception du message et renvoi
	public String repete(String message) {
		
			try {

				PrintWriter sortie = new PrintWriter(getSocket().getOutputStream(), true);
				//PrintWriter permet de formater un stream
				BufferedReader entree = new BufferedReader(new InputStreamReader(getSocket().getInputStream()));
				//BufferedReader permet de lire un stream
				
				//ecriture du message dans la socket
				sortie.println(message);
				String returnStr = entree .readLine();
				return returnStr;//retourne la chaine recu


			} 
			
			catch (IOException e) {
				e.printStackTrace();//si erreur on affiche
			}

			return null;
		}

		private Socket getSocket() {
			return socket;
		}

}