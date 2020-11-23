using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;


namespace test
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            // This will get the current PROJECT directory
            string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;
            Console.WriteLine(projectDirectory);

        }
    }
}
