area[name~"Genova|Pavia|Piacenza|Alessandria|La Spezia"][admin_level="6"];
node(area)[natural=peak](if:number(t["ele"])>1600);
out;