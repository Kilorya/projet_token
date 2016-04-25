package JAJ;

import java.io.PrintWriter;
import org.inria.database.QEPng;
import org.sipd.Main;
import org.sipd.QEP;
import org.sipd.QEP_IDs;
import org.sipd.Schema;


public class MainJAJ implements IProperShutDown
{
	// Attributs
    private  ProperShutDown exit_thread ;
    private Server appli_server = null ;
	private Main token = null ;
	private String dbmsHost = "localhost" ;
	
	
	// Fonction shutdown pour la fermeture
    public void shutdown() 
    {
    	try
    	{
    		token.Desinstall_DBMS_MetaData();
    		token.Shutdown_DBMS();
    	} catch (Exception e) 
    	{
    		e.printStackTrace();
    	}
    	
    	finally
		{
			if (token.out != null)
			{
				token.out.close();
			}
		}
    }
    
    
    // Fonction token
    public void launch_token ()
    {
    	token = new Main() ;
		token.out = new PrintWriter ( java.lang.System.out ) ;
		
		try 
		{	
			// initialize the driver:
			token.init();

			// connect without authentication
			token.openConnection(dbmsHost, null);
			
			// load the DB schema
			String schema = Schema.META;

			// load the DB schema
			token.Install_DBMS_MetaData(schema.getBytes(), 0);
			
			// load and install QEPs
			Class<?>[] executionPlans = new Class[] { QEP.class };
			QEPng.loadExecutionPlans( QEP_IDs.class, executionPlans );
			QEPng.installExecutionPlans( token.db );
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
    }
    
    
    // Fonction start
    public void start ()
    {
    	// Debug
    	System.out.println ( "Appli : launch ..." ) ;
    	
    	// Mise en place de "Ctrl+C" pour une fermeture propre
        exit_thread = new ProperShutDown ( this ) ;
        Runtime.getRuntime().addShutdownHook ( exit_thread ) ;
        
        // Lancement de l'interface avec le token
        this.launch_token() ;
        
        // Lancement du serveur
        appli_server = new Server ( token ) ;
        
        // Debug
        System.out.println ( "Appli : running !" ) ;
        
        token.insertion ( "https://www.google.fr/webhp?hl=fr", "Aurelien", "azerty" ) ;
		/*token.insertion ( "http://hpe.com", "Thierry", "eds" ) ;
		token.insertion ( "http://insa.fr", "Hugator", "hipster" ) ;
		token.selection_all() ;
		token.selection_logs ( "http://hpe.com" ) ;
		token.selection_id ( "http://insa.fr" ) ;
		token.update ( "http://jaj.com", "Valentin", "HEyhey" ) ;
		token.selection_all();
		token.delete ( "http://hpe.com" ) ;
		token.selection_all();*/
        
        // Boucle infinie
        //while ( true ) ;
    }

	
	// Constructeur 
    public MainJAJ() 
    {
    }
    
    
    // Main
 	public static void main ( String argv[] )
 	{
 		MainJAJ appli = new MainJAJ () ; 
 		appli.start() ;
 	}
}
