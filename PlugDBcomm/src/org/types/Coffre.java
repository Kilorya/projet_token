package org.types;

public class Coffre 
{
	// Attributs
	private int idGlobal;
	private String url;
	private String log;
	private String pwd;
	
	
	// Constructeur
	public Coffre( int _idGlobal, String _url, String _log, String _pwd )
	{
		this.idGlobal = _idGlobal;
		this.url = _url;
		this.log = _log;
		this.pwd = _pwd;
	}
	
	
	// Getters
	public int getIdGlobal()
	{
		return this.idGlobal;
	}
	
	public String getUrl()
	{
		return this.url;
	}
	
	public String getLog()
	{
		return this.log;
	}
	
	public String getPwd()
	{
		return this.pwd;
	}
	
	
	// Setters
	public void setIdGlobal( int _idGlobal )
	{
		this.idGlobal = _idGlobal;
	}
	
	public void setUrl( String _url )
	{
		this.url = _url;
	}
	
	public void setLog( String _log )
	{
		this.log = _log;
	}
	
	public void setPwd( String _pwd )
	{
		this.pwd = _pwd;
	}
}
