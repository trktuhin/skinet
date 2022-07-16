using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastucture.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepo<ProductBrand> _brandRepo;
        private readonly IGenericRepo<Product> _productRepo;
        private readonly IGenericRepo<ProductType> _typeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepo<Product> productRepo, IGenericRepo<ProductBrand> brandRepo, IGenericRepo<ProductType> typeRepo, IMapper mapper)
        {
            _mapper = mapper;
            _typeRepo = typeRepo;
            _productRepo = productRepo;
            _brandRepo = brandRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithBrandsAndTypesSpecification();
            var products = await _productRepo.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithBrandsAndTypesSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
            return _mapper.Map<ProductToReturnDto>(product);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            var brands = await _brandRepo.ListAllAsync();
            return Ok(brands);
        }
        [HttpGet("types")]
        public async Task<ActionResult<List<Product>>> GetProductTypess()
        {
            var types = await _typeRepo.ListAllAsync();
            return Ok(types);
        }

    }
}