using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Models
{
    public class CreditValidationResponseDTO
    {
        public bool MeetsRequirement { get; set; }
        public int ApprovedCredits { get; set; }
        public int RequiredCredits { get; set; }
        public int MissingCredits { get; set; }
    }
}
