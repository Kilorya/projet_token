package org.sipd;


public class Schema 
{
	public static final String META =
			"TAB_DESC,4\n"+
					"0	QEP	512\n"+
					"1	LogDeleted	12\n"+
					"2	UpdateLog	512\n"+
					"3	Coffre	365\n"+
					"COL_DESC,15\n"+
					"0	0	IdGlobal	4	1	0\n"+
					"1	0	QEPStr	460	0	4\n"+
					"2	0	SQLStr	24	9	464\n"+
					"3	0	ExplainStr	24	9	488\n"+
					"4	1	TabId	4	1	0\n"+
					"5	1	TuplePos	4	1	4\n"+
					"6	1	Flag	4	1	8\n"+
					"7	2	TabId	4	1	0\n"+
					"8	2	TuplePos	4	1	4\n"+
					"9	2	TupleSize	4	1	8\n"+
					"10	2	CompleteTup	500	0	12\n"+
					"11	3	IdGlobal	4	1	0\n"+
					"12	3	Url	257	0	4\n"+
					"13	3	Log	52	0	261\n"+
					"14	3	Pwd	52	0	313\n"+
					"FK_DESC,0\n"+
					"SKT_DESC,0\n"+
					"SKT_COL_DESC,0\n"+
					"CI_DESC,2\n"+
					"0	0	0	0	1\n"+
					"1	3	3	11	1\n"+
					"";	
}
