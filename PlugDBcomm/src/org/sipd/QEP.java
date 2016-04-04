package org.sipd;


public class QEP 
{
	public static String Coffre_INSERT =
		"/*EP \u0004 6 1 1 -1 1 ?1 # 5 0 0 1 4 3 1 11 r0 12 ?2 13 ?3 14 ?4 # \u0000*/";

	public static String Coffre_SELECT_ALL =
		"/*EP \u0000 0 1 1 3 # 1 0 0 1 r0 4 3 1 11 12 13 14 # \u0000 4 1 1 IdGlobal 0 2 Url 0 3 Log 0 4 Pwd # \u0000*/";

	public static String Coffre_SELECT_LOGS =
		"/*EP \u0001 0 2 2 3 # 1 1 1 2 r0 3 3 1 13 14 12 # 4 0 0 1 12 0 ?1 r3 # \u0000 2 0 1 Log 0 2 Pwd # \u0000*/";

	public static String Coffre_SELECT_ID =
		"/*EP \u0001 0 2 2 3 # 1 1 1 2 r0 2 3 1 11 12 # 4 0 0 1 12 0 ?1 r2 # \u0000 1 1 1 IdGlobal # \u0000*/";

	public static String Coffre_UPDATE =
		"/*EP \u0003 2 2 2 -1 1 ?3 # 1 1 1 2 r1 1 3 1 12 # a 0 0 1 4 3 r1 11 ?3 12 r2 13 v0?1 14 v0?2 # \u0000*/";

	public static String Coffre_DELETE =
		"/*EP \u0001 2 2 2 -1 1 ?1 # 5 1 1 2 3 1 1 4 v13 5 r1 6 v10 # 9 0 0 1 3 r1 # \u0000*/";
}