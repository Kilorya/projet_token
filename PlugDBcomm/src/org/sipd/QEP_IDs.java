package org.sipd;


public class QEP_IDs 
{
	/* EP_QEP class must exist in every application. It allows to interact hardcoded QEPs inside SGBD.
	 * Application QEP start id should be greater than the value of last element of this class. */
	public static class EP_QEP // 1
	{
		public static final int EP_QEP_INSERT = 0;
	}
	
	/* Application QEP ids */
	public static class EP_Coffre
	{	
		public static final int Coffre_INSERT = EP_QEP.EP_QEP_INSERT + 1; // Application QEP start id 
		public static final int Coffre_SELECT_ALL = Coffre_INSERT + 1;
		public static final int Coffre_SELECT_LOGS = Coffre_SELECT_ALL + 1;
		public static final int Coffre_SELECT_ID = Coffre_SELECT_LOGS + 1;
		public static final int Coffre_UPDATE = Coffre_SELECT_ID + 1;
		public static final int Coffre_DELETE = Coffre_UPDATE + 1;
		
	}
}
