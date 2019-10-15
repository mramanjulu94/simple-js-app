var repository = [
  {name: 'Bulbasaur', height: 7, type: ['grass', 'posion']},
  {name: 'Charmander', height: 11, type: ['fire']},
  {name: 'Squirtle', height: 9, type: ['water']}
];

for(var i = 0; i < repository.length; i++)
{
  if(repository[i].height > 10)
  {
    document.write(repository[i].name + "  (height: " + repository[i].height + ")" + " type: " + repository[i].type + "   -  Wow so tall! " +  "<br>" +  "<br>" );

  }
  else
document.write(repository[i].name + "  (height: " + repository[i].height + ")" + " type: " + repository[i].type + " " + "<br>" +  "<br>");
}
