package JAJ;


public class ProperShutDown extends Thread 
{
	// Attributs
    private IProperShutDown who ;

    
    // Constructeur
    public ProperShutDown ( IProperShutDown _who ) 
    {
        this.who = _who ;
    }

    
    // Thread
    public void run() 
    {
        this.who.shutdown() ;
    }
}
